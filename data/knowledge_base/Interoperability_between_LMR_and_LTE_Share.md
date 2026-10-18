---
title: "Interoperability between LMR and LTE_Share.pdf"
original_file_name: "Interoperability between LMR and LTE_Share.pdf"
drive_file_id: "1TkineXjL36epC5kl4dNX9kKvxTAfPGN-"
drive_view_url: "https://drive.google.com/file/d/1TkineXjL36epC5kl4dNX9kKvxTAfPGN-/view"
mime_type: "application/pdf"
folder_path: "AI Bank Knowledge/Technicians/SERVICE MANUAL/"
last_modified: "2024-06-06T02:05:34.000Z"
image_reference_note: "Gambar skematik, diagram blok, kurva grafis, dan foto fisik perangkat dapat dilihat langsung pada file asli di link di atas."
extracted_at: "2026-10-18T00:41:05.512353+00:00"
---

# Interoperability between LMR and LTE_Share.pdf

> 🔗 **Dokumen Asli (Google Drive):** [Interoperability between LMR and LTE_Share.pdf](https://drive.google.com/file/d/1TkineXjL36epC5kl4dNX9kKvxTAfPGN-/view)
> 📂 **Lokasi Folder:** `AI Bank Knowledge/Technicians/SERVICE MANUAL/`
> ℹ️ *Catatan AI: Teks dokumen ini adalah salinan lengkap untuk pemrosesan cepat. Untuk diagram, peta sinyal, kurva frekuensi, dan foto produk resolusi tinggi, rujuk langsung ke link dokumen asli.*

---

### Halaman / Page 1

Interoperability between LMR and LTE
 
TLK 150 and XiR M8600i
Motorola Solutions Confidential Restricted

### Halaman / Page 2

Interoperability Solutions
● Solutions 1 (Current) : Utilize VoX function from M8600i to realize 
interoperability solution unable to include emergency triggering. 
● Solutions 2 (After enable GPIO pin): Enable GPIO 4/10 and ext_alarm 
to realize interoperability solutions including emergency triggering from 
either side(LMR or LTE).
2

### Halaman / Page 3

Solutions 1: Concept and Setup
3
TLK 150 (Donor radio)
M8600i/DM4000e/ XPR 
5000e/ DGM5000e 
(Donor Radio)
TLK 1
TLK 2
TLK 150 MAP 
connector
TG1
TG1
TG2
CH1
CH1
CH2
LMR1 
LMR2 
TG1: Interoperability talk group
TG2: TLK only talk group
CH1: Interoperability Channel
CH2: LMR only channel
M8600i MAP 
connector
M8600i MMP 
connector

### Halaman / Page 4

Solutions 1: Concept and Setup
4
M8600i - rear 
accy pin
TLK150 - rear accy pin
21 3
14 2
12 7
12 15
-Shorting TLK150 pin 15 to gnd is necessary as it 
will allow options to toggle between internal and 
external speaker selection.
Selection must be made to external speaker.
-M8600i Pin 21 (GPIO 3) need to programmed as 
“PL/Talkgroup Detect”.
Connections of M8600i to TLK150 Connections of TLK150 to M8600i
TLK150 - rear 
accy pin
M8600i - front accy pin
16 7
1 5
Additional components placed along the path as 
shown above for differential to single ended 
connection (transformer) and coupling cap (1uf).
- Through the rear connection between both mobile radio, whenever M8600i is receiving, it will trigger TLK150 to 
keyup and audio output from M8600i is feed into TLK150 as audio input.
- M8600i VOX function is utilized for TLK150 to trigger M8600i to keyup whenever TLK150 is receiving. This 
required additional components as stated above. Whenever TLK150 feed in audio signal to M8600i front mic 
input, M8600i will key up.
* note that from TLK150 to M8600i, talking after TPT, there could be few initial words missing as M8600i utilize VOX feature to key up.
* VOX feature in M8600i needs to be enabled and configured accordingly.
* CPS Setting for M8600i

### Halaman / Page 5

Solutions 2: Concept and Setup
5
TLK 150 (Donor radio)
M8600i/DM4000e/ XPR 
5000e/ DGM5000e 
(Donor Radio)
TLK 1
TLK 2
TLK 150 MAP 
connector
TG1
TG1
TG2
CH1
CH1
CH2
LMR1 
LMR2 
TG1: Interoperability talk group
TG2: TLK only talk group
CH1: Interoperability Channel
CH2: LMR only channel
M8600i MAP 
connector

### Halaman / Page 6

Solutions 2: Concept and Setup
6
M8600i - rear accy pin TLK150 - rear accy pin
21 (Talkgroup Detect) 3 (Ext PTT)
14 (Rx Audio) 2 (Ext Mic)
12 (Audio Ground) 7 (Ground)
12 (Audio Ground) 15 (GPIO_9)
12 (Audio Ground) 1 (Ext Spkr-)
11 (Tx Audio) 16 (Ext Spkr+)
17 (Ext PTT) 8 (Talkgroup Detect)
23 (Emerg SW) 4 (Ext Alarm)
26 (Ext Alarm) 9  (Emerg SW)
For M8600i: Pin 21 (GPIO_3) need to be programmed as “PL/Talkgroup Detect” - Active High.
For TLK150: Pin 8 (GPIO_4) need to be programmed as “Talkgroup Detect” - Active Low.
Shorting TLK150 Pin 15 to GND is necessary to switch from internal to external speaker.
Recommended volume for TLK150 - 12 bars or less (Using UU9.8 UF9.8 40mH Common 
Mode Choke)
No volume limit for M8600i. 
Connections between M8600i and TLK150
Additional
Components
Additional
Components
Additional
Components
Through the rear connection between the M8600i and TLK 150 radios, when M8600i is 
receiving, it will trigger TLK150 to key up and audio output from M8600i is fed into TLK150 as 
audio input; and vice versa.
Additional
Components

### Halaman / Page 7

Solutions 2: Concept and Setup
7
M8600i - rear accy pin TLK150 - rear accy pin
21 (Talkgroup Detect) 3 (Ext PTT)
14 (Rx Audio) 2 (Ext Mic)
12 (Audio Ground) 7 (Ground)
12 (Audio Ground) 15 (GPIO_9)
12 (Audio Ground) 1 (Ext Spkr-)
11 (Tx Audio) 16 (Ext Spkr+)
17 (Ext PTT) 8 (Talkgroup Detect)
23 (Emerg SW) 4 (Ext Alarm)
26 (Ext Alarm) 9  (Emerg SW)
Connections between M8600i and TLK150
Additional components placed along the path as 
shown above for differential to single ended 
connection (transformer/choke) and coupling cap 
(1uf).
UU9.8 UF9.8 40mH Common Mode Choke
Additional
Components
Additional
Components
Additional
Components
As for connection between pin 23 (M8600i) to pin 
4 (TLK150) and pin 9 (TLK150) to pin 26 
(M8600i), this is meant for emergency trigger. 
Additional transistor circuit is needed in between 
these 2 connections as Ext Alarm is a 13~14V pin 
while Emerg SW is a 5V pin.
Additional
Components
Additional transistor circuit is needed in between 
pin 21 (M8600i) to pin 3 (TLK150) as pin 21 is a 
5V pin while pin 3 is 1.8V.

### Halaman / Page 8

Solutions 2: Concept and Setup
8
M8600i TLK150
Rx Audio
Ext PTT
Audio GND
TG Detect
Ext Alarm
Emerg SW
Tx Audio
Ext Mic
TG Detect
GND
GPIO_9
Ext PTT
Emerg SW
Ext Alarm
Ext Spkr+
Ext Spkr-

### Halaman / Page 9

Limitations for solutions 2-MAP connector
9
Use case limitations for solutions 2 - Map Connector:
● Strongly recommend to use only interoperability talk group (TG1 and CH1).
○ TG1/CH1 not aware if other devices using own channel(CH2/TG2) are busy and 
transmission did not pass through.
○ There is no 100% full proof solutions to ensure end user would not miss the call 
from other channel.
○ Scanning function can only help in certain user case to prioritize interoperability 
channel/talkgroup calls.
● Emergency call 
○ Always show donor radio caller ID and location. No visibility on which radio 
trigger emergency and location.
○ Response time delay:
Wave to LMR ~ 3s to declare at Wave, minimum 5s include latency
LMR to Wave ~ 7s to trigger, 3s to declare at Wave, minimum 10s
● Broadcast call
○ Required 2 donor radio - for 2 channel (Group call and broadcast)
● Private call
○ Not able to support private call in interoperability mode.

### Halaman / Page 10

BACK UP SLIDES
End
10

### Halaman / Page 12

Interoperability Solutions
TLK 150 MAP Vs RoIP Vs Wave Gateway 
12
 TLK 150 MAP RoIP Vocality box Wave Gateway
Group Call Yes Yes Yes
1 radio-1 Interoperability channel 1 RoIP box - 4 Channel 10 , 50 and 100 channel options
Emergency Call Yes Yes Yes
Only Donor radio caller ID and location Group call ID (no individual ID) Caller ID and location available
Broadcast Call Yes Yes Yes
Separate channel with group call- Additional donor 
radio
No additional HW No additional HW
Private Call No Yes Yes
Hardware needed 2 donor radio (mobile), Cable 1 donor radio, Vocality RoIP gateway Gateway hardware
Advantage Cost effective solutions, do not need HW Gateway Do no need multiple donor radio Individual Caller ID and location available

### Halaman / Page 13

Backup slides
13

### Halaman / Page 14

CPS configurations for XiR M8600i 
14
1.

### Halaman / Page 15

CPS configurations for XiR M8600i 
15
2.

### Halaman / Page 16

CPS configurations for XiR M8600i 
16
3.

### Halaman / Page 17

CPS configurations for XiR M8600i 
17
4.

### Halaman / Page 18

CPS configurations for XiR M8600i 
18
5.
