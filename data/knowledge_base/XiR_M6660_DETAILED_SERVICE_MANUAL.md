---
title: "XiR_M6660 DETAILED SERVICE MANUAL.pdf"
original_file_name: "XiR_M6660 DETAILED SERVICE MANUAL.pdf"
drive_file_id: "1kmnn_CFYYhh0qHp7vPHfybgX0dkrVtRY"
drive_view_url: "https://drive.google.com/file/d/1kmnn_CFYYhh0qHp7vPHfybgX0dkrVtRY/view"
mime_type: "application/pdf"
folder_path: "AI Bank Knowledge/Technicians/SERVICE MANUAL/"
last_modified: "2022-09-26T10:17:06.000Z"
image_reference_note: "Gambar skematik, diagram blok, kurva grafis, dan foto fisik perangkat dapat dilihat langsung pada file asli di link di atas."
extracted_at: "2026-10-18T00:41:39.346095+00:00"
---

# XiR_M6660 DETAILED SERVICE MANUAL.pdf

> 🔗 **Dokumen Asli (Google Drive):** [XiR_M6660 DETAILED SERVICE MANUAL.pdf](https://drive.google.com/file/d/1kmnn_CFYYhh0qHp7vPHfybgX0dkrVtRY/view)
> 📂 **Lokasi Folder:** `AI Bank Knowledge/Technicians/SERVICE MANUAL/`
> ℹ️ *Catatan AI: Teks dokumen ini adalah salinan lengkap untuk pemrosesan cepat. Untuk diagram, peta sinyal, kurva frekuensi, dan foto produk resolusi tinggi, rujuk langsung ke link dokumen asli.*

---

### Halaman / Page 1

CM300d
PROFESSIONAL DIGITAL TWO-WAY RADIOS
MOTOTRBO
TM
 
XiR
TM
 M6660
ALPHANUMERIC
DISPLAY MOBILE
DETAILED SERVICE 
MANUAL

### Halaman / Page 3

i
Foreword
This manual covers all XiR
™ 
M6660 Mobiles, unless otherwise specified. This manual provides sufficient information to 
enable qualified service technicians to troubleshoot and repair XiR
™ 
M6660 Mobiles to the component level.
For details on radio operation or basic troubleshooting, refer to the applicable manuals available separately.
Product Safety and RF Exposure Compliance
ATTENTION!
Before using the mobile two-way product, XiR
™ 
M6660, read the RF Energy Exposure  and Safety 
guide that ships with the radio which contains important operating instructions for safe usage and RF 
energy awareness and control for Compliance with applicable Standards and Regulations.
Computer Software Copyrights
The Motorola products described in this manual may include copyrighted Motorola computer programs stored in 
semiconductor memories or other media. Laws in the United States and other countries preserve for Motorola certain 
exclusive rights for copyrighted computer programs, including, but not limited to, the exclusive right to copy or reproduce 
in any form the copyrighted computer program. Accordingly, any copyrighted Motorola computer programs contained in 
the Motorola products described in this manual may not be copied, reproduced, modified, reverse-engineered, or 
distributed in any manner without the express written permission of Motorola. Furthermore, the purchase of Motorola 
products shall not be deemed to grant either directly or by implication, estoppel, or otherwise, any license under the 
copyrights, patents or patent applications of Motorola, except for the normal non-exclusive license to use that arises by 
operation of law in the sale of a product.
Document Copyrights
No duplication or distribution of this document or any portion thereof shall take place without the express written 
permission of Motorola. No part of this manual may be reproduced, distributed, or transmitted in any form or by any 
means, electronic or mechanical, for any purpose without the express written permission of Motorola.
Disclaimer
The information in this document is carefully examined, and is believed to be entirely reliable. However, no responsibility is 
assumed for inaccuracies. Furthermore, Motorola reserves the right to make changes to any products herein to improve 
readability, function, or design. Motorola does not assume any liability arising out of the applications or use of any product 
or circuit described herein; nor does it cover any license under its patent rights nor the rights of others.
Trademarks
MOTOROLA, MOTO, MOTOROLA SOLUTIONS and the Stylized M logo are trademarks or registered trademarks of 
Motorola Trademark Holdings, LLC and are used under license.  All other trademarks are the property of their respective 
owners.
© 2013 Motorola Solutions, Inc. All rights reserved. 
These servicing instructions are for use by qualified personnel only. To 
reduce the risk of electric shock, do not perform any servicing other than 
that contained in the Operating Instructions unless you are qualified to do 
so. Refer all servicing to qualified service personnel.
!
C a u t i o n

### Halaman / Page 4

ii
Notes

### Halaman / Page 5

iii
 
Document History
The following major changes have been implemented in this manual since the previous edition:
Edition Description Date
68012008049-A
Initial Release.
June 2013

### Halaman / Page 6

iv
 
Notes

### Halaman / Page 7

Warranty and Service Support v
Warranty and Service Support
Motorola offers long term support for its products. This support includes full exchange and/or repair 
of the product during the warranty period, and service/ repair or spare parts support out of warranty. 
Warranty Period and Return Instructions
The terms and conditions of warranty are defined fully in the Motorola Dealer or Distributor or 
Reseller contract. These conditions may change from time to time and the following notes are for 
guidance purposes only. In instances where the product is covered under a "return for replacement" 
or "return for repair" warranty, a check of the product should be performed prior to shipping the unit 
back to Motorola. This is to ensure that the product has been correctly programmed or has not been 
subjected to damage outside the terms of the warranty.
Prior to shipping any radio back to the appropriate Motorola warranty depot, please contact 
Customer Resources or your Motorola dealer, distributor or reseller. All returns must be 
accompanied by a Warranty Claim Form, available from your Customer Service representative or 
Motorola Online Extranet (MOL) or your Motorola dealer, distributor or reseller. Products should be 
shipped back in the original packaging, or correctly packaged to ensure no damage occurs in transit.
After Warranty Period
After the Warranty period, Motorola continues to support its products in two ways. 
1. Motorola's Managed Technical Services (MTS) offers a repair service to both end users and 
dealers at competitive prices. 
2. MTS supplies individual parts and modules that can be purchased by dealers who are 
technically capable of performing fault analysis and repair.
XiR M6660 Digital Mobile Radios Two (2) Years
Product Accessories One (1) Year

### Halaman / Page 8

Notes
vi

### Halaman / Page 9

June, 2013
XiR
™
M6660
Mobile Radios
Detailed Service Manual
Contents
Chapter 1 Service Maintainability
Chapter 2 MOTOTRBO XiR M66 60 Mobile Radio Block 
Diagram 
Chapter 3 Control Head Service Information
Chapter 4 Generic Option Board (GOB)
Service Information
Chapter 5 Controller Service Information
Chapter 6 VHF Low Power (1 –25 W) Service Information
Chapter 7 VHF High Power (25–45  W) Service Information
Appendix A Replacement Parts and Kits
Glossary

### Halaman / Page 10

viii
Notes

### Halaman / Page 11

ix
 
Summary of Printed Circuit Boards and Bands available:
Table below lists all the bands available in this manual and the revision of the Printed Circuit Boards used. For 
details, please refer to the respective chapters.
Chapter Description PC Board Part Number Board Revision
3
Numeric Display Control Head 
84012531002
B
3 Alphanumeric Display Control Head 84012531002 B
4
Generic Option Board (GOB)
84012198001
A
6 VHF Low Power 136–174 MHz, 1–25 W 84012504002 B
7
VHF High Power 136–174 MHz, 25–45 W
84012505002
B

### Halaman / Page 12

x
 
Notes

### Halaman / Page 13

XiR
™
M6660
Mobile Radios
Chapter 1
Service Maintainability
M
Issue: June, 2013

### Halaman / Page 14

Computer Software Copyrights
The Motorola products described in this manual may include copyrighted Motorola computer programs stored 
in semiconductor memories or other media. Laws in the United States and other countries preserve for 
Motorola certain exclusive rights for copyrighted computer programs, including, but not limited to, the 
exclusive right to copy or reproduce in any form the copyrighted computer program. Accordingly, any 
copyrighted Motorola computer programs contained in the Motorola products described in this manual may 
not be copied, reproduced, modified, reverse-engineered, or distributed in any manner without the express 
written permission of Motorola. Furthermore, the purchase of Motorola products shall not be deemed to grant 
either directly or by implication, estoppel, or otherwise, any license under the copyrights, patents or patent 
applications of Motorola, except for the normal non-exclusive license to use that arises by operation of law in 
the sale of a product.

### Halaman / Page 15

i
Chapter 1 
–
 Service Maintainability
Table of Contents
Section 1 Introduction
1.0 Notations Used in This Manual.. .......................................................................... 1-1
2.0 Radio Description ......... ....................................................................................... 1-1
Section 2 Maintenance
1.0 Introduction............... ........................................................................................... 2-1
2.0 Preventive Maintenance ........... ........................................................................... 2-1
2.1 Inspection......... .............................................................................................. 2-1
2.2 Cleaning Procedures...... ................................................................................ 2-1
3.0 Safe Handling of CMOS  and LDMOS Devices.................................................... 2-2
4.0 Repair Procedures and Techniques  – General ................................................... 2-4
5.0 Pre-baking of Integrated Circuit s ......................................................................... 2-5
5.1 IPC/JEDEC J-STD-020D.1 (Mar ch 2008) Chart ............................................ 2-7
Section 3 Test Equipment and Service Aids
1.0 Recommended Test Equipment .... ...................................................................... 3-1
2.0 Service Aids....... .................................................................................................. 3-2
3.0 Programming Cables....... .................................................................................... 3-3
4.0 Programming and Test Cabl e.............................................................................. 3-3
5.0 Test Cable ................ ........................................................................................... 3-4
6.0 Accessory Cable........... ....................................................................................... 3-5
Section 4 Power-Up Self Test
1.0 Power-Up Error Codes .... .................................................................................... 4-1

### Halaman / Page 16

ii
Notes

### Halaman / Page 17

1-1
Section 1
INTRODUCTION
1.0 Notations Used in This Manual
Throughout the text in this publication, you will notice the use of note and caution notations. These 
notations are used to emphasize that safety hazards exist, and due care must be taken and 
observed.
NOTE: An operational procedure, practice, or condition that is essential to emphasize.
2.0 Radio Description
The XiR M6660 mobile radios are available in the following frequency ranges and power levels.
These radios are among the most sophisticated two-way radios available. They have a
robust design for radio users who need high performance, quality, and reliability in their daily 
communications. This architecture provides the capability of supporting a multitude of legacy and 
advanced features resulting in a more cost-effective two-way radio communications solution. 
CAUTION indicates a potentially hazardous situation which, if 
not avoided, might result in equipment damage.
Table 1-1  Radio Frequency Ranges and Power Levels
Freq. Band Bandwidth Power Level
VHF
136–174 MHz
1–25 Watts
25–45 Watts
UHF B1 403–470 MHz 1–25 Watts
25–40 Watts
!
C a u t i o n

### Halaman / Page 18

1-2
Notes

### Halaman / Page 19

2-1
Section 2
MAINTENANCE
1.0 Introduction
This chapter provides details about the following:
•
Preventive maintenance (inspection and cleaning)
•
Safe handling of CMOS and LDMOS devices
•
Repair procedures and techniques
•
Pre-baking of Integrated Circuits
2.0 Preventive Maintenance
Periodic visual inspection and cleaning is recommended.
2.1 Inspection
Check that the external surfaces of the radio are clean, and that all external controls and switches 
are functional. It is not recommended to inspect the interior electronic circuitry.
2.2 Cleaning Procedures
The following procedures describe the recommended cleaning agents and the methods to be used 
when cleaning the external and internal surfaces of the radio. External surfaces include the control 
head and housing assembly. These surfaces should be cleaned whenever a periodic visual 
inspection reveals the presence of smudges, grease, and/or grime. 
NOTE: Internal surfaces should be cleaned only when the radio is disassembled for service or repair.
The only recommended agent for cleaning the external radio surfaces is a 0.5% solution of a mild 
dishwashing detergent in water. The only factory recommended liquid for cleaning the printed circuit 
boards and their components is isopropyl alcohol (100% by volume).
Use all chemicals as prescribed by the manufacturer. Be sure to follow all 
safety precautions as defined on the label or material safety data sheet.
The effects of certain chemicals and their vapors can have harmful results on 
certain plastics. Avoid using aerosol sprays, tuner cleaners and other 
chemicals.
!
C a u t i o n

### Halaman / Page 20

2-2 Safe Handling of CMOS and LDMOS Devices
Cleaning External Plastic Surfaces
Apply the 0.5% detergent-water solution sparingly with a stiff, non-metallic, short-bristled brush to 
work all loose dirt away from the radio. Use a soft, absorbent, lintless cloth or tissue to remove the 
solution and dry the radio. Make sure that no water remains entrapped near the connectors, cracks, 
or crevices.
Cleaning Internal Circuit Boards and Components
Isopropyl alcohol (100%) may be applied with a stiff, non-metallic, short-bristled brush to dislodge 
embedded or caked materials located in hard-to-reach areas. The brush stroke should direct the 
dislodged material out and away from the inside of the radio. Make sure that controls or tunable 
components are not soaked with alcohol. Do not use high-pressure air to hasten the drying process 
since this could cause the liquid to collect in unwanted places. Once the cleaning process is 
complete, use a soft, absorbent, lintless cloth to dry the area. Do not brush or apply any isopropyl 
alcohol to the frame, control head and housing assembly.
NOTE: Always use a fresh supply of alcohol and a clean container to prevent contamination by 
dissolved material (from previous usage).
3.0 Safe Handling of CM OS and LDMOS Devices
Complementary Metal Oxide Semiconductor (CMOS) and Laterally Diffused Metal Oxide 
Semiconductor (LDMOS) devices are used in this family of radios, and are susceptible to damage by 
electrostatic or high voltage charges. Damage can be latent, resulting in failures occurring weeks or 
months later. Therefore, special precautions must be taken to prevent device damage during 
disassembly, troubleshooting, and repair. 
Handling precautions are mandatory for CMOS/LDMOS circuits and are especially important in low 
humidity conditions.

### Halaman / Page 21

Safe Handling of CMOS and LDMOS Devices 2-3
DO NOT attempt to disassemble the radio without first referring to the following CAUTION 
statement.
This radio contains static-sensitive devices. Do not open the radio unless you are 
properly grounded. Take the following precautions when working on this unit:
• Store and transport all CMOS/L DMOS devices in conductive 
material so that all exposed leads are shorted together. Do not insert 
CMOS/LDMOS devices into conventional plastic “snow” trays used 
for storage and transportation of other semiconductor devices.
• Ground the working surface of the service bench to protect the 
CMOS/LDMOS device. We recommend using a wrist strap, two 
ground cords, a table mat, a floor mat, ESD shoes, and an ESD 
chair.
• Wear a conductive wrist strap in series with a 100k resistor to 
ground. (Replacement wrist straps that connect to the bench top 
covering are Motorola part number 4280385A59).
• Do not wear nylon clothing while handling CMOS/LDMOS devices.
• Do not insert or remove CMOS/LDMOS devices with power applied. 
Check all power supplies used for testing CMOS/LDMOS devices to 
be certain that there are no voltage transients present.
• When straightening CMOS/LDMOS pins, provide ground straps for 
the apparatus used.
• When soldering, use a grounded soldering iron.
• If at all possible, handle CMOS/LDMOS devices by the package and 
not by the leads. Prior to touching the unit, touch an electrical 
ground to remove any static charge that you may have 
accumulated. The package and substrate may be electrically 
common. If so, the reaction of a discharge to the case would cause 
the same damage as touching the leads.
!
C a u t i o n

### Halaman / Page 22

2-4 Repair Procedures and Techniques – General
4.0 Repair Procedures and Techniques – General
Any rework or repair on Environmentally Preferred Products must be done using the appropriate 
lead-free solder wire and lead-free solder paste as stated in the following table:
Parts Replacement and Substitution
Check the parts list for the proper Motorola part number and order the part from the nearest 
Motorola Radio Products and Solutions Organization listed in Appendix A of this manual.
Rigid Circuit Boards
This family of radios uses bonded, multi-layer, printed circuit boards. Since the inner layers are not 
accessible, some special considerations are required when soldering and unsoldering components. 
The printed through holes may interconnect multiple layers of the printed circuit. Therefore, exercise 
care to avoid pulling the plated circuit out of the hole.
When soldering near a connector: 
•
Avoid accidentally getting solder in the connector 
•
Be careful not to form solder bridges between the connector pins 
•
Examine your work closely for shorts due to solder bridges
For soldering components with Hot-Air or infra red solder systems, please check your user guide of 
the solder system to get information on solder temperature and time for the different housings of the 
integrated circuits and other components.
NOTE
Environmentally Preferred Prod ucts (EPP) (refer to the marking on the printed circuit
boards – examples shown below) were developed and assembled using environmentally
preferred components and solder assembly  techniques to comply with the European
Union’s Restriction of Hazardous Substances (ROHS 2) Directive 2011/65/EU 
and
Waste Electrical and Electronic Equipment (W EEE) Directive 2012/19/EU
. To
maintain product compliance and reliability, use only the Motorola specified parts in this
manual.
Table 2-1  Lead Free Solder Wire Part Number List
Motorola 
Part Number Alloy Flux Type Flux Content by Weight Melting Point Supplier Part number Diameter Weight
1088929Y01
95.5Sn/3.8Ag/0.7Cu
RMA Version
2.7–3.2%
217°C
52171
0.015”
1lb spool
Table 2-2  Lead Free Solder Paste Part Number List
Motorola Part 
Number
Manufacturer Part 
Number Viscosity Type Composition & Percent Metal Liquid Temperature
1085674C03
NC-SMQ230
900–1000KCPs 
Brookfield (5rpm)
Type 3 
(-325/+500)
(95.5%Sn–3.8%Ag–0.7%Cu) 
89.3%
217°C

### Halaman / Page 23

Pre-baking of Integrated Circuits 2-5
5.0 Pre-baking of Integrated Circuits
Electronic components are generally coated with plastic material which has the nature of not being 
waterproof. If kept unsealed, the components can absorb humidity. When soldered to the board 
(especially with reflow techniques) a sudden change in temperature can cause fissures or cracks 
which can result in malfunction or damage. Therefore, service should temper in a Desiccant Cabinet 
(12 hours at 50 degree Celsius) the radio PCB, before heating up areas around MS components.
To avoid this problem, these Moisture Sensitive (MS) components should be stored and shipped in a 
sealed wrapping (dry pack). Processing must take place only with dry components when an 
uninterrupted dry storage can be guaranteed, otherwise the components have to be pre-baked.
If a reflow procedure takes place close to MS components the whole board must be pre-baked.
Please refer to the following table:
Table 2-3  MS Components and Location
Location Circuit Ref. Motorola Part No. MSL
Alphanumeric Display Control Head
D6005
D6006
D6008
D6009
D6011
D6012
D6013
D6014
48012219001
2
Alphanumeric Display Control Head D6004 48012255001 2
Alphanumeric Display Control Head
D6002
4805729G73
2A
Alphanumeric Display Control Head D6001 4805729G74 2A
Alphanumeric Display Control Head
D6000
4805729G75
2A
Controller R1 U2001M1 51012031001 3
Controller R1
U2001M1
51012058002
3
Controller R1 U3103M1 51012142001 2
Controller R1
U2000M1
51012239002
3
Controller R1 U3200M1 51012469001 2
Controller R1
U1001M1
51012487001
3
Controller R1 U3104M1U3105M1 5114610F01 2
VHF 25–45 W
Q0702M6
48012022001
3
UHF1 25–40 W Q0705M6
VHF 1–25 W
Q0702M5
48012067002
3
UHF1 1–25 W Q0705M5
VHF 1–25 W
VHF 25–45 W
UHF1 1–25 W
UHF1 25–40 W
Q0402M4
48012201001
2

### Halaman / Page 24

2-6 Pre-baking of Integrated Circuits
VHF 1–25 W
VHF 25–45 W
UHF1 1–25 W
UHF1 25–40 W
VR0201M7
VR0400M4
VR0401M4
VR0402M4
VR0403M4
4805656W87 2
VHF 1–25 W
VHF 25–45 W
VR0205M7
VR0210M7
VR0211M7
VR0214M7
VR0215M7
UHF1 1–25 W
UHF1 25–40 W
VR0200M7
VR0202M7
VR0203M7
VR0250M7
VR0251M7
VR0252M7
VR0253M7
VHF 1–25 W
VHF 25–45 W
UHF1 1–25 W
UHF1 25–40 W
D0401M4
D0402M4
4813974A19
2
VHF 1–25 W
UHF1 1–25 W Q0700M5
4816547H01 2
VHF 25–45 W
UHF1 25–40 W
Q0700M6
VHF 1–25 W Q0704M5
4816548H01 3
UHF1 1–25 W
Q0702M5
VHF 25–45 W
UHF1 25–40 W Q0704M6
VHF 1–25 W
VHF 25–45 W
UHF1 1–25 W
UHF1 25–40 W
U0000M2
51009686002
3
VHF 1–25 W
UHF1 1–25 W U0903M5
5115022H01 3
VHF 25–45 W
U0904M6
UHF1 25–40 W U0903M6
VHF 1–25 W
VHF 25–45 W
U200M7
5186310Y39
2
VHF 1–25 W
VHF 25–45 W
UHF1 1–25 W
UHF1 25–40 W
U0401M4
U0402M4
UHF1 1–25 W
UHF1 25–40 W
U0350M7
Table 2-3  MS Components and Location (Continued)
Location Circuit Ref. Motorola Part No. MSL

### Halaman / Page 25

Pre-baking of Integrated Circuits 2-7
5.1 IPC/JEDEC J-STD-020D .1 (March 2008) Chart
Table 2-4  Moisture Sensitivity Levels
LEVEL
FLOOR LIFE
SOAK REQUIREMENTS
STANDARD
ACCELERATED EQUIVALENT
1
Note 1: CAUTION – To use the “accelerated equivalent” soak conditi ons, correlation of damage response (including
electrical, after soak and reflow), should be established with the “standard” soak conditions. Alternatively, if the
known activation energy for moisture diffusion of the package materials is in the range of 0.40–0.48 eV or 0.30–0.39
eV, the “accelerated equivalent” may be used. Accelerated soak times may vary due to material properties (e.g. mold
compound, encapsulant, etc. ). JEDEC document JESD22-A120 provides a method for determining the diffusion
coefficient.
eV
0.40–0.48
eV
0.30–0.39
CONDITION
TIME 
(hours) CONDITION TIME (hours) CONDITION TIME (hours) TIME (hours)
1
Unlimited
≤30 °C/85%
RH
168
+5/-0
85 °C/85%
RH
NA
NA
NA
2 1 year ≤30 °C/60%RH 168+5/-0 85 °C/60%RH NA NA NA
2a
4 weeks
≤30 °C/60%
RH
696
2
+5/-0
Note 2: The standard soak time includes a default valu e of 24 hours for semiconductor Manufacturer’s Exposure Time
(MET) between bake and bag and includes the maximum time allowed out of the bag at the distributor’s facility.
If the actual MET is less than 24 hours, the soak time ma y be reduced. For soak conditions of 30 °C/60% RH, the
soak time is reduced by 1 hour for each hour the MET is less than 24 hours. For soak conditions of 60 °C/60% RH,
the soak time is reduced by 1 hour for each 5 hours the MET is less than 24 hours.
If the actual MET is greater than 24 hours the soak time  must be increased. If soak conditions are 30 °C/60% RH,
the soak time is increased 1 hour for each hour that the actual MET exceeds 24 hours. If soak conditions are 
60 °C/60% RH, the soak time is increased 1 hour for each 5 hours that the actual MET exceeds 24 hours.
Note 3: Supplier may extend the soak times at their own risk.
30 °C/60%
RH
120
+1/-0
168
+1/-0
60 °C/60%
RH
3 168 hours ≤30 °C/60%RH 192
2
+5/-0
30 °C/60%
RH
40
+1/-0
52
+1/-0
60 °C/60%
RH
4
72 hours
≤30 °C/60%
RH
96
2
+2/-0
30 °C/60%
RH
20
+5/-0
24
+0.5/-0
60 °C/60%
RH
5 48 hours ≤30 °C/60%RH 72
2
+2/-0
30 °C/60%
RH
15
+5/-0
20
+0.5/-0
60 °C/60%
RH
5a
24 hours
≤30 °C/60%
RH
48
2
+2/-0
30 °C/60%
RH
10
+0.5/-0
13
+0.5/-0
60 °C/60%
RH
6 Time on Label (TOL) ≤30 °C/60%RH TOL 30 °C/60%RH NA NA NA

### Halaman / Page 26

2-8 Pre-baking of Integrated Circuits
Notes

### Halaman / Page 27

Recommended Test Equipment 3-1
Section 3
TEST EQUIPMENT AND SERVICE AIDS
1.0 Recommended Test Equipment
The list of equipment contained in Table 3-1 includes most of the standard test equipment required 
for servicing Motorola mobile radios.
Table 3-1  Recommended Test Equipment
Equipment Characteristic Example Application
Service Monitor
Can be used as a 
substitute for items 
marked with an asterisk 
(*)
Aeroflex 3920, or equivalent
Frequency/deviation meter and 
signal generator for wide-range 
troubleshooting and alignment
Digital RMS 
Multimeter*
100 
µ
V to 300 V
5 Hz to 1 MHz
10 Meg Ohm Impedance
Fluke 179 or equivalent 
(www.fluke.com)
AC/DC voltage and current 
measurements. Audio voltage 
measurements.
RF Signal 
Generator*
100 MHz to 1 GHz
-130 dBM to +10 dBM
FM Modulation 0 kHz to 
10 kHz
Agilent N5181 
(www.agilent.com) or equivalent
Receiver measurements
Oscilloscope* 2 Channels
50 MHz Bandwidth
5 mV/div to 20 V/div
Tektronix TDS1001b 
(www.tektronix.com) or 
equivalent
Waveform measurements
Power Meter and 
Sensor*
5% Accuracy
100 MHz to 500 MHz
50 Watts
Bird 43 Thruline Watt Meter
(www.bird-electronic.com) or 
equivalent
Transmitter power output 
measurements
RF Millivolt Meter 100 mV to 3 V RF
10 kHz to 1 GHz
Boonton 92EA 
(www.boonton.com) or 
equivalent
RF level measurements
Power Supply
0 V to 32 V
0 A to 20 A
B&K Precision 1790
(www.bkprecision.com) or 
equivalent
Voltage supply

### Halaman / Page 28

3-2 Service Aids
2.0 Service Aids
Table 3-2 lists the service aids recommended for working on the radio. While all of these items are 
available from Motorola, most are standard workshop equipment items, and any equivalent item 
capable of the same performance may be substituted for the item listed.
Table 3-2  Service Aids
Motorola
Part Number Description Application
RLN4460_
Test Box
Enables connection to audio/accessory jack. Allows 
switching for radio testing.
PMVN4130_ Customer Programming 
Software and AirTracer on 
CD-ROM
CPS allows Dealers/Distributors to program radio 
parameters. AirTracer allows the capturing of radio 
traffic into logs for analysis by Motorola.
PMVN4131_
Tuner on CD-ROM
Radio Tuning. Only Motorola Service Centers or 
Authorized Motorola Service Dealers can perform this 
function.
PMKN4147_ Front Telco MMP USB
Programming Cable
Connects the radio’s front connector to a USB port for 
radio programming and data applications.
PMKN4148_
Back 20 Pin MAP USB 
Programming Cable
Connects the radio’s rear connector to a USB port for 
radio programming and data applications.
PMKN4149_ Back 20 Pin MAP Test and USB 
Programming Cable
Connects the radio’s rear connector to a USB port for 
radio programming, data applications, testing and 
alignment.
PMKN4150_
Back 20 Pin MAP Test Cable
Connects the radio’s rear connector for testing. Must 
use in conjunction with PMKN4147_ (Front Telco MMP 
USB Programming Cable) for radio programming and 
alignment.
PMKN4151_ Back 16 Pin MAP Universal 
Cable
Connects the radio’s rear connector to the center 16 
pins with unterminated connectors at the user end.
HPN4007_
Power Supply 
Provides the radio with power when bench testing. 
6686119B01 Control Head Dismantling Tool Assi sts in the removal of radio control head.

### Halaman / Page 29

Programming Cables 3-3
3.0 Programming Cables
Figure 3-1  Front Telco MMP USB Programming Cable PMKN4147_
Figure 3-2  Back 20 Pin MAP USB Programming Cable PMKN4148_
4.0 Programming and Test Cable
Figure 3-3  Back 20 Pin MAP Test and USB Programming Cable PMKN4149_
20
2
19
1
15
17
16
18
14
915±15
CABLE
1455±24
CABLE
TO MOBILE RADIO
ACCESSORY
CONNECTOR
VIEWED FROM 
FRONT (PIN END)
OF CONNECTOR
USB CONNECTORDB 25 CONNECTOR
20 2
19 11 5 17
16 18
1
14 25
13
1
14 25
13
WIRE DIAGRAM
20 PIN 
ACCESSORY PORT CONNECTOR
USB DB25P
PIN 19 VCC (5v)  (USB VBUS) PIN 1
PIN 18 DATA - PIN 2
PIN 17 DATA + PIN 3
PIN 20
GROUND (USB) PIN 4
DRAIN WIRE AND BRAID SHELL
PIN 1 SPEAKER - PIN 2 & 7
PIN 2 EXT MIC AUDIO PIN 10 & 15
PIN 3 PROGM INPUT (EXT. PTT) PIN 20
PIN 7 GROUND (DB25) PIN 16
WIRE COLOUR
RED
WHITE
GREEN
BLACK
DRAIN WIRE/BRAID
ORANGE
GREY
PINK
PIN 5 FLAT TX AUDIO YELLOW PIN 18
BLACK
PIN 15 RSSI BROWN PIN 19
PIN 16 SPEAKER + PURPLE PIN 1 & 5

### Halaman / Page 30

3-4 Test Cable
5.0 Test Cable
Figure 3-4  Back 20 Pin MAP Test Cable PMKN4150_
Table 3-3  Wire Diagram for PMKN4150_ 
20
2
19
1
15
17
16
18
1
14 25
13
1
1425
13
WIRE DIAGRAM
20 PIN 
ACCESSORY PORT CONNECTOR
WIRE COLOUR DB25P
PIN
No. DESCRIPTION
1 SPEAKER - 2 & 7
2 EXT MIC 10 & 15
3 GPI_1(EXT PTT) 20
5 FLAT TX 18
16 SPEAKER + 1 & 5
-- -- 
ORANGE
GREY
PINK
YELLOW
7 GROUND BLACK 16
15 RSSI BROWN 19
PURPLE


> *Catatan: Dokumen memiliki total 172 halaman. Halaman 1-30 telah diekstrak ke dalam teks Markdown.*
