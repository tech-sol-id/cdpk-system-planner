package id.citradata.cdpkplanner;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

public class MainActivity extends AppCompatActivity {

    private static final String APP_URL = "https://cdpk-system-planner.onrender.com";
    private static final int PERMISSION_REQUEST_LOCATION = 1001;
    private static final int FILE_CHOOSER_REQUEST = 1002;
    private static final int PERMISSION_REQUEST_AUDIO = 1003;

    private WebView webView;
    private WebView popupWebView;
    private SwipeRefreshLayout swipeRefresh;
    private ProgressBar progressBar;
    private LinearLayout popupContainer;
    private FrameLayout popupWebViewFrame;
    private GeolocationPermissions.Callback geoCallback;
    private String geoOrigin;
    private ValueCallback<Uri[]> uploadMessage;
    private PermissionRequest pendingAudioRequest;
    private String cleanUserAgent;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        swipeRefresh = findViewById(R.id.swipeRefresh);
        webView = findViewById(R.id.webView);
        progressBar = findViewById(R.id.progressBar);
        popupContainer = findViewById(R.id.popupContainer);
        popupWebViewFrame = findViewById(R.id.popupWebViewFrame);
        TextView btnClosePopup = findViewById(R.id.btnClosePopup);

        webView.setBackgroundColor(Color.parseColor("#020617"));

        if (btnClosePopup != null) {
            btnClosePopup.setOnClickListener(v -> closePopupWebView());
        }

        // Configure Swipe to Refresh
        swipeRefresh.setColorSchemeResources(R.color.accent, R.color.primary);
        swipeRefresh.setOnRefreshListener(() -> {
            String currentUrl = webView.getUrl();
            if (currentUrl == null || currentUrl.startsWith("about:blank")) {
                webView.loadUrl(APP_URL);
            } else {
                webView.reload();
            }
        });

        // Build clean Chrome Mobile User-Agent (strip "; wv" and "Version/4.0" so Google OAuth / GIS permits WebView sign-in)
        WebSettings settings = webView.getSettings();
        String defaultUa = settings.getUserAgentString();
        cleanUserAgent = defaultUa
                .replace("; wv)", ")")
                .replace("; wv", "")
                .replace("Version/4.0 ", "")
                + " CDPKAndroidApp/8.7.0";

        configureWebViewSettings(webView);

        // Expose JS Bridge so web app can close OAuth popup immediately upon receiving Google ID token
        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void closeAuthPopup() {
                runOnUiThread(() -> closePopupWebView());
            }
        }, "CDPKAndroidBridge");

        // Main WebViewClient
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                if (progressBar != null) {
                    progressBar.setVisibility(View.VISIBLE);
                    progressBar.setProgress(15);
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                swipeRefresh.setRefreshing(false);
                if (progressBar != null) {
                    progressBar.setVisibility(View.GONE);
                }
                if ("about:blank".equals(url)) {
                    view.loadUrl(APP_URL);
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleInternalOrExternalNavigation(view, request.getUrl());
            }
        });

        // Main WebChromeClient (Multi-Window Google OAuth Popup + Geolocation + File Chooser)
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if (progressBar != null) {
                    if (newProgress < 100) {
                        progressBar.setVisibility(View.VISIBLE);
                        progressBar.setProgress(newProgress);
                    } else {
                        progressBar.setVisibility(View.GONE);
                    }
                }
            }

            @SuppressLint("SetJavaScriptEnabled")
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog, boolean isUserGesture, Message resultMsg) {
                closePopupWebView();

                popupWebView = new WebView(MainActivity.this);
                popupWebView.setLayoutParams(new FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                ));
                configureWebViewSettings(popupWebView);

                popupWebView.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView subView, WebResourceRequest request) {
                        Uri uri = request.getUrl();
                        String scheme = uri.getScheme();
                        if (scheme != null && (scheme.equals("http") || scheme.equals("https") || scheme.equals("about") || scheme.equals("javascript"))) {
                            return false; // Keep all OAuth & Google GIS redirects inside popupWebView
                        }
                        return handleInternalOrExternalNavigation(subView, uri);
                    }
                });

                popupWebView.setWebChromeClient(new WebChromeClient() {
                    @Override
                    public void onCloseWindow(WebView window) {
                        closePopupWebView();
                    }
                });

                if (popupWebViewFrame != null && popupContainer != null) {
                    popupWebViewFrame.removeAllViews();
                    popupWebViewFrame.addView(popupWebView);
                    popupContainer.setVisibility(View.VISIBLE);
                }

                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
                transport.setWebView(popupWebView);
                resultMsg.sendToTarget();
                return true;
            }

            @Override
            public void onCloseWindow(WebView window) {
                closePopupWebView();
            }

            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    geoCallback = callback;
                    geoOrigin = origin;
                    ActivityCompat.requestPermissions(MainActivity.this,
                            new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION},
                            PERMISSION_REQUEST_LOCATION);
                } else {
                    callback.invoke(origin, true, false);
                }
            }

            // v8.7.0 Field Voice Note: grant ONLY microphone capture, ONLY to the app's own HTTPS origin.
            // Camera, protected media (DRM), MIDI and any other origin are always denied.
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                boolean wantsAudio = false;
                for (String resource : request.getResources()) {
                    if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(resource)) {
                        wantsAudio = true;
                        break;
                    }
                }
                if (!wantsAudio || !isTrustedAppOrigin(request.getOrigin())) {
                    request.deny();
                    return;
                }
                if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
                    request.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE});
                } else {
                    if (pendingAudioRequest != null) {
                        pendingAudioRequest.deny();
                    }
                    pendingAudioRequest = request;
                    ActivityCompat.requestPermissions(MainActivity.this,
                            new String[]{Manifest.permission.RECORD_AUDIO},
                            PERMISSION_REQUEST_AUDIO);
                }
            }

            @Override
            public void onPermissionRequestCanceled(PermissionRequest request) {
                if (pendingAudioRequest == request) {
                    pendingAudioRequest = null;
                }
            }

            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (uploadMessage != null) {
                    uploadMessage.onReceiveValue(null);
                }
                uploadMessage = filePathCallback;

                Intent intent = fileChooserParams.createIntent();
                try {
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST);
                } catch (Exception e) {
                    uploadMessage = null;
                    return false;
                }
                return true;
            }
        });

        // Enable SwipeRefresh only when at top of page
        webView.getViewTreeObserver().addOnScrollChangedListener(() -> {
            swipeRefresh.setEnabled(webView.getScrollY() == 0);
        });

        // Modern Back Press Callback
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (popupContainer != null && popupContainer.getVisibility() == View.VISIBLE) {
                    if (popupWebView != null && popupWebView.canGoBack()) {
                        popupWebView.goBack();
                    } else {
                        closePopupWebView();
                    }
                    return;
                }
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    finish();
                }
            }
        });

        // Load Live System URL
        webView.loadUrl(APP_URL);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebViewSettings(WebView targetWebView) {
        WebSettings settings = targetWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setSupportMultipleWindows(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setUserAgentString(cleanUserAgent);

        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setAcceptThirdPartyCookies(targetWebView, true);
    }

    private void closePopupWebView() {
        if (popupContainer != null) {
            popupContainer.setVisibility(View.GONE);
        }
        if (popupWebViewFrame != null) {
            popupWebViewFrame.removeAllViews();
        }
        if (popupWebView != null) {
            try {
                popupWebView.stopLoading();
                popupWebView.destroy();
            } catch (Exception ignored) {
            }
            popupWebView = null;
        }
    }

    // Exact scheme + host + port match against APP_URL (no suffix/contains matching, so
    // look-alike hosts such as cdpk-system-planner.onrender.com.evil.tld are rejected).
    private boolean isTrustedAppOrigin(Uri origin) {
        if (origin == null) return false;
        Uri app = Uri.parse(APP_URL);
        String host = origin.getHost();
        int port = origin.getPort();
        return "https".equalsIgnoreCase(origin.getScheme())
                && host != null
                && host.equalsIgnoreCase(app.getHost())
                && (port == -1 || port == 443);
    }

    private boolean handleInternalOrExternalNavigation(WebView view, Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme();
        String host = uri.getHost();
        String path = uri.getPath() != null ? uri.getPath() : "";

        // Never override internal about:blank, javascript:, data:, or blob: URLs
        if (scheme == null || scheme.equals("about") || scheme.equals("javascript") || scheme.equals("data") || scheme.equals("blob")) {
            return false;
        }

        // Keep app domains and Google Auth / Identity Services internal inside WebView
        if (host != null) {
            String h = host.toLowerCase();
            boolean isExternalGoogleWorkspaceDoc = h.contains("docs.google.com") || h.contains("drive.google.com");
            boolean isDownloadApk = path.startsWith("/download/apk") || path.startsWith("/download/android");
            if (!isExternalGoogleWorkspaceDoc && !isDownloadApk && (
                    h.contains("onrender.com") ||
                    h.contains("hf.space") ||
                    h.contains("accounts.google.com") ||
                    h.contains("google.com") ||
                    h.contains("googleapis.com") ||
                    h.contains("gstatic.com") ||
                    h.contains("googleusercontent.com") ||
                    h.contains("youtube.com")
            )) {
                return false;
            }
        }

        // External links (Google Sheets, Drive, APK download, mailto, tel) open in system app
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            startActivity(intent);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_LOCATION) {
            boolean granted = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
            if (geoCallback != null) {
                geoCallback.invoke(geoOrigin, granted, false);
                geoCallback = null;
                geoOrigin = null;
            }
        } else if (requestCode == PERMISSION_REQUEST_AUDIO) {
            boolean granted = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
            if (pendingAudioRequest != null) {
                if (granted) {
                    pendingAudioRequest.grant(new String[]{PermissionRequest.RESOURCE_AUDIO_CAPTURE});
                } else {
                    pendingAudioRequest.deny();
                }
                pendingAudioRequest = null;
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST) {
            if (uploadMessage != null) {
                Uri[] results = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
                uploadMessage.onReceiveValue(results);
                uploadMessage = null;
            }
        }
    }
}
