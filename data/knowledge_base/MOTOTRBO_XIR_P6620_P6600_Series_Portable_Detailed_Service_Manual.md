---
title: "MOTOTRBO XIR P6620 P6600 Series Portable Detailed Service Manual.pdf"
original_file_name: "MOTOTRBO XIR P6620 P6600 Series Portable Detailed Service Manual.pdf"
drive_file_id: "1PyJ9RZ7yBWfAJkjAIGkB_WVHcQ4itNuD"
drive_view_url: "https://drive.google.com/file/d/1PyJ9RZ7yBWfAJkjAIGkB_WVHcQ4itNuD/view"
mime_type: "application/pdf"
folder_path: "AI Bank Knowledge/Technicians/SERVICE MANUAL/"
last_modified: "2023-05-25T10:26:46.000Z"
image_reference_note: "Gambar skematik, diagram blok, kurva grafis, dan foto fisik perangkat dapat dilihat langsung pada file asli di link di atas."
extracted_at: "2026-10-18T00:41:30.985434+00:00"
---

# MOTOTRBO XIR P6620 P6600 Series Portable Detailed Service Manual.pdf

> 🔗 **Dokumen Asli (Google Drive):** [MOTOTRBO XIR P6620 P6600 Series Portable Detailed Service Manual.pdf](https://drive.google.com/file/d/1PyJ9RZ7yBWfAJkjAIGkB_WVHcQ4itNuD/view)
> 📂 **Lokasi Folder:** `AI Bank Knowledge/Technicians/SERVICE MANUAL/`
> ℹ️ *Catatan AI: Teks dokumen ini adalah salinan lengkap untuk pemrosesan cepat. Untuk diagram, peta sinyal, kurva frekuensi, dan foto produk resolusi tinggi, rujuk langsung ke link dokumen asli.*

---

### Halaman / Page 1

PROFESSIONAL DIGITAL TWO-WAY RADIO
MOTOTRBO™
XiR™ P6000 SERIES
DETAILED SERVICE MANUAL

### Halaman / Page 2

Foreword
This manual covers all models of the XiR  series Portable Radios, unless otherwise specified. It includes all the information 
necessary to maintain peak product performance and maximum working time, using levels 1 and 2 maintenance 
procedures. This level of service goes down to the board replacement level and is typical of some local service centers, 
Motorola Authorized Dealers, self-maintained customers, and distributors.
Product Safety and RF Exposure Compliance
ATTENTION!
This radio is restricted to occupational use only to satisfy FCC RF energy exposure requirements. 
Before using this product, read the RF energy awareness information and operating instructions in the 
Product Safety and RF Exposure booklet enclosed with your radio (Motorola Publication part number  
6804110J47) to ensure compliance with RF energy exposure limits.
For a list of Motorola-approved antennas, batteries, and other accessories, visit the following web site 
which lists approved accessories:http://www.motorola.com/governmentandenterprise
Computer Software Copyrights
The Motorola products described in this manual may include copyrighted Motorola computer programs stored in 
semiconductor memories or other media. Laws in the United States and other countries preserve for Motorola certain 
exclusive rights for copyrighted computer programs, including, but not limited to, the exclusive right to copy or reproduce in 
any form the copyrighted computer program. Accordingly, any copyrighted Motorola computer programs contained in the 
Motorola products described in this manual may not be copied, reproduced, modified, reverse-engineered, or distributed in 
any manner without the express written permission of Motorola. Furthermore, the purchase of Motorola products shall not 
be deemed to grant either directly or by implication, estoppel, or otherwise, any license under the copyrights, patents or 
patent applications of Motorola, except for the normal non-exclusive license to use that arises by operation of law in the 
sale of a product.
Document Copyrights
No duplication or distribution of this document or any portion thereof shall take place without the express written permission 
of Motorola. No part of this manual may be reproduced, distributed, or transmitted in any form or by any means, electronic 
or mechanical, for any purpose without the express written permission of Motorola.
Disclaimer
The information in this document is carefully examined, and is believed to be entirely reliable. However, no responsibility is 
assumed for inaccuracies. Furthermore, Motorola reserves the right to make changes to any products herein to improve 
readability, function, or design. Motorola does not assume any liability arising out of the applications or use of any product 
or circuit described herein; nor does it cover any license under its patent rights nor the rights of others.
Trademarks
MOTOROLA, MOTO, MOTOROLA SOLUTIONS and the Stylized M logo are trademarks or registered trademarks of 
Motorola Trademark Holdings, LLC and are used under license. All other trademarks are the property of their respective 
owners.
© 2011 Motorola Solutions, Inc.
All rights reserved..
Before using this product, read the operating instructions 
for safe usage contained in the Product Safety and RF 
Exposure booklet enclosed with your radio.
!
C a u t i o n

### Halaman / Page 3

iii
Document History
The following major changes have been implemented in this manual since the previous edition:
Edition Description Date
68012003092-A Initial Release June 2012

### Halaman / Page 4

iv
Notes

### Halaman / Page 5

v
Table of Contents
Document History .......................................................................................................... iii
Section 1 Introduction ......................................................................... 1-1
1.0 Notations Used in This  Manual............................................................................ 1-1
2.0 Radio Description ......... ....................................................................................... 1-1
Section 2 Maintenance ........................................................................ 2-1
1.0 Introduction............... ........................................................................................... 2-1
2.0 Preventive Maintenance ........... ........................................................................... 2-1
2.1 Inspection................ ....................................................................................... 2-1
2.2 Cleaning Procedures.... .................................................................................. 2-1
2.3 Safe Handling of CMOS and LDMOS Devices .............................................. 2-2
3.0 Repair Procedures and Techniques  — General.................................................. 2-4
Section 3 Test Equipment and Service Aids ..................................... 3-1
1.0 Recommended Test Equipment .... ...................................................................... 3-1
2.0 Service Aids.............. ........................................................................................... 3-2
3.0 Programming, Testing and Alignm ent Cable ....................................................... 3-3
Section 4 Power Up Self-Test ............................................................. 4-1
1.0 Power-Up Error Codes (Display  Model only)....................................................... 4-1
2.0 Operational Error Codes ...................................................................................... 4-2
Section 5 Radio Information ............................................................... 5-1
1.0 General Controller Block...... ................................................................................ 5-1
1.1 FGU.............. .................................................................................................. 5-2
1.2 Receiver ........... .............................................................................................. 5-3
1.3 Transmitter .............. ....................................................................................... 5-4
1.4 GPS.............. .................................................................................................. 5-5
1.5 Keypad and LCD.......... .................................................................................. 5-6
1.6 GOB ................. .............................................................................................. 5-8
1.7 Troubleshooting Charts............ ...................................................................... 5-9
Troubleshooting Flow Chart for Controller (Sheet 1 of 4)....................................... 5-9
Troubleshooting Flow Chart for Controller (Sheet 2 of 4)..................................... 5-10
Troubleshooting Flow Chart for Controller (Sheet 3 of 4)..................................... 5-11
Troubleshooting Flow Chart for Controller (Sheet 4 of 4)..................................... 5-12
Troubleshooting Flow Chart for Receiver (Sheet 1 of 2 ....................................... 5-13
Troubleshooting Flow Chart for Receiver (Sheet 2 of 2 ....................................... 5-14

### Halaman / Page 6

vi
Troubleshooting Flow Chart for Transmitter .........................................................5-15
Troubleshooting Flow Chart for VCO (Sheet 1 of 2).............................................5-16
Troubleshooting Flow Chart for VCO (Sheet 2 of 2).............................................5-17
Troubleshooting Flow Chart for Synthesizer.........................................................5-18
Troubleshooting Flow Chart for GPS/Bluetooth (Sheet 1 of 2).............................5-19
Troubleshooting Flow Chart for GPS/Bluetooth (Sheet 2 of 2).............................5-20
Troubleshooting Flow Chart for Keypad ...............................................................5-21
Troubleshooting Flow Chart for GOB....................................................................5-22
2.0 Circuit Board/Sc hematic Diagrams and Parts List for UHF................................6-23
 Main Board UHF Top Side PCB No. 84012264001_A ........................................6-23
Main Board UHF Bottom Side PCB No. 84012264001_A ....................................6-24
......................................................................................................................6-25
......................................................................................................................6-26
......................................................................................................................6-35
......................................................................................................................6-36
......................................................................................................................6-37
......................................................................................................................6-38
......................................................................................................................6-39
......................................................................................................................6-40
......................................................................................................................6-41
UHF Radio Parts List (84012264001_A) ..............................................................6-42
......................................................................................................................6-42
......................................................................................................................6-43
......................................................................................................................6-44
......................................................................................................................6-45
......................................................................................................................6-46
......................................................................................................................6-47
......................................................................................................................6-48
Main Board VHF Top Side PCB No. 84012338001_A..........................................6-49
Main Board VHF Bottom Side PCB No. 84012338001_A ....................................6-50
......................................................................................................................6-51
......................................................................................................................6-52
......................................................................................................................6-53
......................................................................................................................6-54
......................................................................................................................6-55
......................................................................................................................6-56
......................................................................................................................6-57
......................................................................................................................6-58
......................................................................................................................6-59
......................................................................................................................6-60
......................................................................................................................6-61
......................................................................................................................6-62
......................................................................................................................6-63
......................................................................................................................6-64
......................................................................................................................6-65
......................................................................................................................6-66

### Halaman / Page 7

vii
..................................................................................................................... 6-67
3.0 Circuit Board/Schematic Di agrams and Parts List for VHF ............................... 6-68
..................................................................................................................... 6-68
..................................................................................................................... 6-69
..................................................................................................................... 6-70
..................................................................................................................... 6-71
..................................................................................................................... 6-72
..................................................................................................................... 6-73
..................................................................................................................... 6-74
..................................................................................................................... 6-75
..................................................................................................................... 6-75
..................................................................................................................... 6-76
..................................................................................................................... 6-77
..................................................................................................................... 6-78
..................................................................................................................... 6-79
..................................................................................................................... 6-80
..................................................................................................................... 6-81
..................................................................................................................... 6-82
..................................................................................................................... 6-83
..................................................................................................................... 6-84
..................................................................................................................... 6-85
..................................................................................................................... 6-86
VHF Radio Parts List (84012338001_A).............................................................. 6-87
..................................................................................................................... 6-87
..................................................................................................................... 6-88
..................................................................................................................... 6-89
..................................................................................................................... 6-90
..................................................................................................................... 6-91
..................................................................................................................... 6-92
4.0 Circuit Board/Schematic Diagrams and Parts List for Keypad Board 
(84012286001_A).............................................................................................. 6-93
Main Board Topside for Keypad Board 84012286001_A..................................... 6-93
Main Board Bottom for Keypad Board 84012286001_A ...................................... 6-94
Full Keypad Radio Parts List (84012286001_A) .................................................. 6-96
Appendix A Replacement Parts Ordering..............................................A-1

### Halaman / Page 8

viii
1.0 Basic Ordering Information ..... ............................................................................ A-1
2.0 Motorola Online............ ....................................................................................... A-1
3.0 Mail Orders......... ................................................................................................. A-1
4.0 Telephone Orders .......... ..................................................................................... A-1
5.0 Fax Orders ......... ................................................................................................. A-1
6.0 Parts Identification............... ................................................................................ A-1
7.0 Product Customer Serv ice .................................................................................. A-2
Appendix B Motorola Service Ce nters...................................................B-1
1.0 Servicing Information .............. ............................................................................ B-1
2.0 Motorola Service Center ......... ............................................................................ B-1
3.0 Motorola Canadian Techni cal Logistics Center................................................... B-1
4.0 Motorola Federal Techni cal Center..................................................................... B-1
Glossary ..............................................................................................G-1

### Halaman / Page 9

List of Figures ix
List of Figures
Figure 5-1: Controller Block Diagr am............................................................................................ .........  5-1
Figure 5-2: FGU ................................................................................................................. ....................  5-2
Figure 5-3: Receiver...................................... .........................................................................................  5-3
Figure 5-4: Transmitter......................................................................................................... ..................  5-4
Figure 5-5: GPS ................................................................................................................. ....................  5-5
Figure 5-6: Full Keypad......................................................................................................... .................  5-6
Figure 5-7: Limited Keypad .............................. ......................................................................................  5-7
Figure 5-8: GOB................................................................................................................. ....................  5-8

### Halaman / Page 10

x Related Publications
List of Tables
Table 1-1. Radio Frequency Ranges and Power Levels ....................................................................... 1-1
Table 2-2. Lead Free Solder Wire Pa rt Number List ............................................................................. 2-4
Table 2-3. Lead Free Solder Paste Pa rt Number List ........................................................................... 2-4
Table 3-1. Recommended Test Equipment .................. ......................................................................... 3-1
Table 3-2. Service Aids ......................................................................................................... ................ 3-2
Table 3-3. Pin Configuration of Side Connector.... ................................................................................ 3-4
Table 4-4. Power-Up Erro r Codes................................................................................................. ........ 4-1
Table 4-5. Operational Error Codes .............................................................................................. ........ 4-3

### Halaman / Page 11

List of Tables xi
Related Publications
IMPRES Adaptive Single-Unit Charger User Manual ..................................................................6816787H01
IMPRES Adaptive Multi-Unit Charger User Manual ....................................................................6816789H01
IMPRES Adaptive Multi-Unit Charger Service Manual ................................................................ 6871357L01
Remote Speaker Microphone User Manual................................................................................. 6871003L0 1
IMPRES Remote Speaker Microphone User Manual.................................................................. 6871004L01
Factory Mutual Approval Manual ................................................................................................. 6871532L01
*MOTOTRBO™ Portable User Guide CD ................................................................................... PMLN5136_
*CD consists of: 
XiR™ P8200/P8208 User Guide
XiR™ P8200/P8208 Quick Reference Card
XiR™ P8260/P8268 User Guide
XiR™ P8260/P8268 Quick Reference Card
Safety Leaflet

### Halaman / Page 12

xii List of Tables
Notes

### Halaman / Page 13

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
Motorola Online (MOL) or your Motorola dealer, distributor or reseller. Products should be shipped 
back in the original packaging, or correctly packaged to ensure no damage occurs in transit.
After Warranty Period
After the Warranty period, Motorola continues to support its products in two ways. 
1. Motorola's Managed Technical Services (MTS) offers a repair service to both end users and 
dealers at competitive prices. 
2. MTS supplies individual parts and modules that can be purchased by dealers who are 
technically capable of performing fault analysis and repair.

### Halaman / Page 14

Notes
xiv Warranty and Service Support

### Halaman / Page 15

Section 1
INTRODUCTION
1.0 Notations Used in This Manual
Throughout the text in this publication, you will notice the use of note and caution notations. These 
notations are used to emphasize that safety hazards exist, and due care must be taken and 
observed.
2.0 Radio Description
The XiR series portable radios available in the following frequency ranges and power levels.
These digital radios are among the most sophisticated two-way radios available. They have a robust 
design for radio users who need high performance, quality, and reliability in their daily 
communications. This architecture provides the capability of supporting a multitude of legacy and 
advanced features resulting in a more cost-effective two-way radio communications solution.
NOTE An operational procedure, practice, or condition that is essential to emphasize.
CAUTION indicates a potentially hazardous situation which, if 
not avoided, might result in equipment damage.
Table 1-1.  Radio Frequency Ranges and Power Levels
Frequency Band Bandwidth Power Level
UHF 403–527 MHz 1 or 3.5, 4 Watt
VHF 136–174 MHz 1 or 3.5, 5 Watt
!
C a u t i o n

### Halaman / Page 16

Notes
1-2  Radio Description

### Halaman / Page 17

Section 2
MAINTENANCE
1.0 Introduction
This chapter provides details about the following
• Preventive maintenance (inspection and cleaning).
• Safe handling of CMOS and LDMOS devices.
• Repair procedures and techniques
2.0 Preventive Maintenance
Periodic visual inspection and cleaning is recommended.
2.1 Inspection
Check that the external surfaces of the radio are clean, and that all external controls and switches 
are functional. It is not recommended to inspect the interior electronic circuitry.
2.2 Cleaning Procedures
The following procedures describe the recommended cleaning agents and the methods to be used 
when cleaning the external and internal surfaces of the radio. External surfaces include the front 
cover, housing assembly and battery case. These surfaces should be cleaned whenever a periodic 
visual inspection reveals the presence of smudges, grease, and/or grime. 
Only Motorola Service Centers or Authorized Motorola Service Dealers can 
perform this function.
NOTE Internal surfaces should be cleaned only when the radio is disassembled for service or
repair.
!
C a u t i o n

### Halaman / Page 18

2-2 Preventive Maintenance
The only recommended agent for cleaning the external radio surfaces is a 0.5% solution of a mild 
dishwashing detergent in water. The only factory recommended liquid for cleaning the printed circuit 
boards and their components is isopropyl alcohol (100% by volume).
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
since this could cause the liquid to collect in unwanted places. After completing of the cleaning 
process, use a soft, absorbent, lintless cloth to dry the area. Do not brush or apply any isopropyl 
alcohol to the frame, front cover or back cover.
2.3 Safe Handling of CM OS and LDMOS Devices
Complementary metal-oxide semiconductor (CMOS) devices are used in this family of radios, and 
are susceptible to damage by electrostatic or high voltage charges. Damage can be latent, resulting 
in failures occurring weeks or months later. Therefore, special precautions must be taken to prevent 
device damage during disassembly, troubleshooting, and repair. 
Handling precautions are mandatory for CMOS circuits and are especially important in low humidity 
conditions. 
The effects of certain chemicals and their vapors can have harmful results on 
certain plastics. Avoid using aerosol sprays, tuner cleaners and other 
chemicals.
NOTE Always use a fresh supply of alcohol and a clean container to prevent contamination by 
dissolved material (from previous usage).
!
C a u t i o n

### Halaman / Page 19

Preventive Maintenance 2-3
DO NOT attempt to disassemble the radio without first referring to the following CAUTION 
statement.
This radio contains static-sensitive devices. Do not open the radio unless you are 
properly grounded. Take the following precautions when working on this unit:
• Store and transport all CMOS devices in conductive material so that 
all exposed leads are shorted together. Do not insert CMOS devices 
into conventional plastic “snow” trays used for storage and 
transportation of other semiconductor devices.
• Ground the working surface of the service bench to protect the 
CMOS device. We recommend using a wrist strap, two ground 
cords, a table mat, and a floor mat.
• Wear a conductive wrist strap in series with a 100k resistor to 
ground. (Replacement wrist straps that connect to the bench top 
covering are Motorola part number 4280385A59).
• Do not wear nylon clothing while handling CMOS devices.
• Do not insert or remove CMOS devices with power applied. Check 
all power supplies used for testing CMOS devices to be certain that 
there are no voltage transients present.
• When straightening CMOS pins, provide ground straps for the 
apparatus used.
• When soldering, use a grounded soldering iron.
• If at all possible, handle CMOS devices by the package and not by 
the leads. Prior to touching the unit, touch an electrical ground to 
remove any static charge that you may have accumulated. The 
package and substrate may be electrically common. If so, the 
reaction of a discharge to the case would cause the same damage 
as touching the leads.
!
C a u t i o n

### Halaman / Page 20

2-4 Repair Procedures and Techniques — General
3.0 Repair Procedures and Techniques — General
Any rework or repair on Environmentally Preferred Products must be done using the appropriate 
lead-free solder wire and lead-free solder paste as stated in the following table:
Parts Replacement and Substitution
When damaged parts are replaced, identical parts should be used. If the identical replacement part 
is not locally available, check the parts list for the proper Motorola part number and order the part 
from the nearest Motorola Radio Products and Solutions Organization (RPSO) listed in Appendix A  
of this manual.
Rigid Circuit Boards
The family of radios uses bonded, multi-layer, printed circuit boards. Since the inner layers are not 
accessible, some special considerations are required when soldering and unsoldering components. 
The printed through holes may interconnect multiple layers of the printed circuit. Therefore, exercise 
care to avoid pulling the plated circuit out of the hole.
When soldering near connector: 
• Avoid accidentally getting solder in the connector. 
• Be careful not to form solder bridges between the connector pins. 
• Examine your work closely for shorts due to solder bridges.
NOTE Environmentally Preferred Prod ucts (EPP) (refer to the marking on the printed circuit
boards — examples shown below) were developed and assembled using environmen-
tally preferred components and solder assembly techniques to comply with the Euro-
pean Union’s Restriction of Hazardous Substa nces (ROHS) Directive 2002/95/EC
and Waste Electrical and Electronic E quipment (WEEE) Directive 2002/96/EC . To
maintain product compliance and reliability, use only the Motorola specified parts in this
manual.
Table 2-2.  Lead Free Solder Wire Part Number List
Motorola 
Part Number Alloy Flux Type Flux Content by Weight Melting Point Supplier Part number Diameter Weight
1088929Y01 95.5Sn/3.8Ag/0.7Cu RMA Version 2.7-3.2% 217C 52171 0.015” 1lb spool
Table 2-3.  Lead Free Solder Paste Part Number List
Motorola Part 
Number
Manufacturer Part 
Number Viscosity Type Composition & Percent Metal Liquid Temperature
1085674C03 NC-SMQ230 900-1000KCPs 
Brookfield (5rpm)
Type 3 
(-325/+500)
(95.5%Sn-3.8%Ag-0.7%Cu) 
89.3%
217°C

### Halaman / Page 21

Repair Procedures and Techniques — General 2-5
Chip Components
Use the RLN4062 Hot-Air Repair Station for chip component replacement. Adjust the temperature 
control to 370°C (700°F), and adjust the airflow to a minimum setting. Airflow can vary due to 
component density.
• To remove a chip component: 
1. Use a hot-air hand piece and position the nozzle of the hand piece approximately 0.3 cm
(1/8") above the component to be removed. 
2. Begin applying the hot air. Once the solder reflows, remove the component using a pair of 
tweezers. 
3. Using a solder wick and a soldering iron or a power desoldering station, remove the excess 
solder from the pads.
• To replace a chip component using a soldering iron: 
1. Select the appropriate micro-tipped soldering iron and apply fresh solder to one of the solder 
pads.
2. Using a pair of tweezers, position the new chip component in place while heating the fresh 
solder.
3. Once solder wicks onto the new component, remove the heat from the solder.
4. Heat the remaining pad with the soldering iron and apply solder until it wicks to the 
component. If necessary, touch up the first side. All solder joints should be smooth and shiny.
• To replace a chip component using hot air:
1. Use the hot-air hand piece and reflow the solder on the solder pads to smooth it.
2. Apply a drop of solder paste flux to each pad.
3. Using a pair of tweezers, position the new component in place.
4. Position the hot-air hand piece approximately 0.3 cm (1/8”) above the component and begin 
applying heat.
5. Once the solder wicks to the component, remove the heat and inspect the repair. All joints 
should be smooth and shiny.

### Halaman / Page 22

2-6 Repair Procedures and Techniques — General
Notes

### Halaman / Page 23

Section 3
TEST EQUIPMENT AND SERVICE AIDS
1.0 Recommended Test Equipment
The list of equipment contained in Table 3-1 includes most of the standard test equipment required 
for servicing Motorola portable radios.
Table 3-1.  Recommended Test Equipment
Equipment Characteristics Example Application
Service
Monitor
Can be used as a substi-
tute for items marked with 
an asterisk (*)
Aeroflex 2975 
(www.aeroflex.com), 
Motorola R2670, or equivalent
Frequency/deviation meter and 
signal generator for wide-range 
troubleshooting and alignment
Digital RMS 
Multimeter *
100 µV to 300 V
5 Hz to 1 MHz
10 Mega Ohm Impedance
Fluke 179 or equivalent 
(www.fluke.com)
AC/DC voltage and 
current measurements. Audio 
voltage measurements
RF Signal 
Generator *
100 MHz to 1 GHz
-130 dBm to +10 dBm
FM Modulation 0 kHz to 
10 kHz
Audio Frequency 100 Hz 
to 10 kHz
Agilent N5181A 
(www.agilent.com), 
Ramsey RSG1000B 
(www.ramseyelectronics.com), or 
equivalent
Receiver measurements
Oscilloscope * 2 Channel
50 MHz Bandwidth
5 mV/div to 20 V/div
Leader LS8050 
(www.leaderusa.com), 
Tektronix TDS1001b
(www.tektronix.com),
or equivalent
Waveform measurements
Power Meter 
and Sensor *
5% Accuracy
100 MHz to 500 MHz
50 Watts
Bird 43 Thruline Watt Meter 
(www.bird-electronic.com) or 
equivalent
Transmitter power output 
measurements
RF Millivolt 
Meter
100 mV to 3 V RF
10 kHz to 1 GHz
Boonton 92EA 
(www.boonton.com) or equivalent
RF level measurements
Power Supply 0 V to 32 V
0 A to 20 A
B&K Precision 1790 
(www.bkprecision.com) 
or equivalent
Voltage supply

### Halaman / Page 24

3-2 Service Aids
2.0 Service Aids
Table 3-2 lists the service aids recommended for working on the radio. While all of these items are 
available from Motorola, most are standard workshop equipment items, and any equivalent item 
capable of the same performance may be substituted for the item listed.
Table 3-2.  Service Aids
Motorola 
Part No. Description Application
RLN4460_ Portable Test Set Enables connection to the audio/accessory jack. 
Allows switching for radio testing.
PMVN4130_ Customer Programming 
Software and AirTracer on 
CD-ROM
CPS allows Dealers/Distributors to program radio 
parameters. AirTracer allows the capturing of radio 
traffic into logs for analysis by Motorola.
PMVN4131_ Tuner on CD-ROM Radio Tuning. Only Motorola Service Centers or 
Authorized Motorola Service Dealers can perform 
this function
PMKN4012_ Portable Programming Cable This cable connects the radio to a USB port for radio 
programming and data applications. 
PMKN4013_ Portable Programming, Testing & 
Alignment Cable
This cable connects the radio to a USB port for radio 
programming, testing and alignment.
PMNN4076_ 7.5V Universal Battery Eliminator Connects to radio via battery eliminator cable.
5880384G68 DMR SMA to BNC RF Adaptor Adapts radio’s antenna port to BNC cabling of test 
equipment.
PMHN4085_ Bench Test Housing Eliminator Intercon nects radio to power supply. Provides for 
troubleshooting of the radio when the housing is 
removed.
NLN9839_ Vacuum Pump Kit Allows servicer to test for leakages.
NTN4265_ Pressure Pump  Kit Allows servicer to locate leakages.
5871134M01 Connector Fitting This connector allows the vacuum hose to be 
connected to the radio chassis.
3271133M01 Fitting Seal This seal secures the connector fitting to the radio 
chassis.

### Halaman / Page 25

Programming, Testing and Alignment Cable 3-3
3.0 Programming, Testin g and Alignment Cable
Figure 3-1.  Programming, Testing and Alignment Cable

### Halaman / Page 26

3-4 Programming, Testing and Alignment Cable
Table 3-3.  Pin Configuration of Side Connector
CONNECTION
P1 P2 P3
Pin Pin Pin Function
1 GROUND
1 3 VCC (5V)
34 D A T A +
25 D A T A -
16 4 6 GROUND
1 & 5 7 EXTERNAL SPEAKER+
2 & 7 8 EXTERNAL SPEAKER-
20 9 EXTERNAL PTT
17 10 EXTERNAL MIC+
16 11 EXTERNAL MIC-

### Halaman / Page 27

Section 4
POWER UP SELF-TEST
1.0 Power-Up Error Codes (Display Model only)
Upon powering up, the radio performs certain tests to determine if its basic electronics and software 
are in working order. Any error detected has an associated error code that is presented on the radio 
display. These error codes are intended to be used by a service technician when the radio 
generates the Self Test Fail Tone. If these tests are successfully completed, the radio will generate 
the Self Test Tone.
There are two classes of detectable errors, fatal and non-fatal. If it is considered as a fatal error, then 
the normal radio operation will be inhibited. Fatal errors include hardware errors detected by the 
microprocessor and certain memory errors. These memory errors include incorrect ROM checksum, 
incorrect RAM checksum, and incorrect checksums of codeplug (Persistent Storage) blocks that 
contain operating parameters. If the codeplug block operating parameters are corrupted, operation 
of the unit on the proper frequency, system, and group are in question. Attempts to use this 
information could provide the user with a false sense of security that others are receiving his 
messages. Corrupted codeplug blocks of call IDs, or their associated aliases are considered non-
fatal errors. While the user may be inconvenienced, normal communication is still possible.
Table 4-4.  Power-Up Error Codes
Error Code Description Error Type Corrective Action
ERROR 01/02 Call ID or associated 
aliases codeplug block 
checksum is wrong.
Non-Fatal Normal communicatio n is still possible, but the 
user may be inconvenienced.
Reprogram codeplug.
ERROR 01/22 Tuning Codeplug block 
checksum is wrong.
Non-Fatal Normal communication is still possible.
FAIL 01/82 External Codeplug block 
checksum is wrong.
Fatal Reprogram codeplug. If message reoccurs, 
send radio to nearest Motorola Service Cen-
ters or Authorised Motorola Service Centers to 
replace Back Cover Kit.
FAIL 01/92 Secure Codeplug check-
sum error
Fatal Reprogram codeplug. If message reoccurs, 
send radio to nearest Motorola Service Cen-
ters or Authorised Motorola Service Centers to 
replace Back Cover Kit.
FAIL 01/A2 Tuning Codeplug block 
checksum is wrong.
Fatal Reprogram codeplug. If message reoccurs, 
send radio to nearest Motorola Service Cen-
ters or Authorised Motorola Service Centers to 
replace Back Cover Kit.
FAIL 01/81 ROM Checksum is 
wrong.
Fatal Send radio to nearest Motorola Service Cen-
ters or Authorised Motorola Service Centers to 
replace Back Cover Kit

### Halaman / Page 28

4-2 Power-Up Error Codes (Display Model only)
FAIL 01/88 Radio RAM Test Failure. Fatal Retest radio by turning it off and turning it on 
again, If message reoccurs, send radio to 
nearest Motorola Service Centers or Autho-
rised Motorola Service Centers to replace 
Back Cover Kit
FAIL 01/90
or 
FAIL 02/90
General hardware test 
failure.
Fatal Retest radio by turning it off and turning it on 
again, If message reoccurs, send radio to 
nearest Motorola Service Centers or Autho-
rised Motorola Service Centers to replace 
Back Cover Kit
FAIL 02/81 DSP ROM Checksum is 
wrong.
Fatal Send radio to nearest Motorola Service Cen-
ters or Authorised Motorola Service Centers to 
replace Back Cover Kit
FAIL 02/82 DSP RAM1 test failure. Fatal Retest radio by turning it off and turning it on 
again, If message reoccurs, send radio to 
nearest Motorola Service Centers or Autho-
rised Motorola Service Centers
FAIL 02/84 DSP RAM2 test failure. Fatal Retest radio by turning it off and turning it on 
again, If message reoccurs, send radio to 
nearest Motorola Service Centers or Autho-
rised Motorola Service Centers to replace 
Back Cover Kit
FAIL 02/88 DSP RAM test failure. Fatal Retest radio by turning it off and turning it on 
again, If message reoccurs, send radio to 
nearest Motorola Service Centers or Autho-
rised Motorola Service Centers to replace 
Back Cover Kit
FAIL 02/C0 DSP ROM Checksum is 
wrong.
Fatal Retest radio by turning it off and turning it on 
again, If message reoccurs, send radio to 
nearest Motorola Service Centers or Autho-
rised Motorola Service Centers to replace 
Back Cover Kit
No Display Display module is not 
connected properly.
Display module is dam-
aged.
Fatal Send radio to nearest Motorola Service Cen-
ters or Authorised Motorola Service Centers to 
check connection between main board and 
display module. Replace with new display 
module. 
NOTE A non-display radio emits only the Self Test Fail Tone if it fails the self-test.
Table 4-4.  Power-Up Error Codes (Continued)
Error Code Description Error Type Corrective Action

### Halaman / Page 29

Operational Error Codes 4-3
2.0 Operational Error Codes
During radio operation, the radio performs dynamic tests to determine if the radio is working properly. 
Problems detected during these tests are presented as error codes on the radio’s display. The 
presence of an error code should prompt a user that a problem exists and that a Motorola Authorized 
MOTOTRBO dealer should be contacted. Use Table 4-5. to aid in understanding particular 
operational error codes.
Table 4-5.  Operational Error Codes
Error Code Description Error Type Corrective Action
FAIL 001 Synthesizer Out-of-Lock NON-FATAL Reprogram codeplug. If message reoccurs, 
send radio to nearest Motorola Service 
Centers or Authorised Motorola Service 
Centers to replace Back Cover Kit.
FAIL 002 Personality checksum or 
system block error
NON-FATAL Reprogram codeplug. If message reoccurs, 
send radio to nearest Motorola Service 
Centers or Authorised Motorola Service 
Centers to replace Back Cover Kit.

### Halaman / Page 30

4-4 Operational Error Codes


> *Catatan: Dokumen memiliki total 132 halaman. Halaman 1-30 telah diekstrak ke dalam teks Markdown.*
