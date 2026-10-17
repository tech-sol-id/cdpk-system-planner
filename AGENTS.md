# Strict Security, Threat Modeling & Architecture Rules (CDPK Security Policy)

## 1. Non-Negotiable Core Principle: Pre-Recommendation Threat Analysis
Before presenting ANY technical recommendation, configuration, credential setting, origin URL, network port, or architecture decision to the user, the agent MUST proactively perform a thorough Threat & Vulnerability Analysis:
1. **Principle of Least Privilege & Zero Trust:**
   - Always recommend the most restrictive setting that accomplishes the goal.
   - NEVER recommend wildcard permissions (e.g. `*`, open CORS, broad origins, public database access).
   - When suggesting configuration changes, state the specific security impact, risk level, and rationale.
2. **Strict Environment Boundary Separation:**
   - Production credentials, production OAuth clients, and live databases MUST NEVER be mixed with development, testing, or local endpoints.
   - NEVER recommend binding production OAuth clients, webhooks, or API keys to `localhost`, `127.0.0.1`, `http://`, or unencrypted origins.
   - Maintain a strict zero-exposure posture for local development addresses in production setups.
3. **Loophole & Attack Vector Assessment:**
   - Always evaluate potential abuse vectors: domain spoofing, privilege escalation, unauthorized self-registration, session hijacking, replay attacks, and man-in-the-middle vulnerabilities.
   - If any potential loophole or conflict logic is identified, prioritize security hardening before implementation.

---

## 2. Authentication, Authorization & Identity Management
- **Domain Whitelisting:** Enforce strict enterprise domain validation (`citradata.id`, `techsolutions.id`). Public email providers (`@gmail.com`, `@yahoo.com`, etc.) and arbitrary domains are strictly forbidden from accessing internal resources.
- **Admin Privilege Protection:** Privileged roles (`admin`) must NEVER be assignable via public self-registration. Admin roles can only be granted by an authenticated Administrator via explicit promotion.
- **Mandatory Admin Verification (Pending Approval):** Self-registered accounts must start in `pending` state and remain locked until explicitly audited and approved by an Administrator.
- **Password Security:** Store passwords using PBKDF2 with SHA-256 and unique cryptographic salts (minimum 100,000 iterations). Use constant-time comparison (`secrets.compare_digest`) to prevent timing attacks.
- **Session Security:** Use cryptographically secure session tokens (`secrets.token_urlsafe(32)`), expire sessions upon logout or timeout, and protect against token exfiltration.

---

## 3. Web & Network Security Standards
- **HTTPS Enforced:** All production traffic must strictly enforce TLS/HTTPS.
- **Strict HTTP Headers:** Always enforce:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **CORS & Origin Safety:** Authorised JavaScript origins in OAuth and API endpoints must explicitly match verified production hostnames. Never use open wildcards for sensitive APIs.

---

## 4. Cloud & Google Workspace Integration Safety
- Only access authorized Google Drive folders and Google Sheets tabs.
- Tokens must be refreshed using secure server-side credentials and never exposed to the client browser.
- Destructive operations (deletion of spreadsheets, users, or cloud archives) must always require explicit confirmation.
