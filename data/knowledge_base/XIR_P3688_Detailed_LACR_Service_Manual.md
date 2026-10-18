---
title: "XIR_P3688_Detailed_LACR_Service_Manual.pdf"
original_file_name: "XIR_P3688_Detailed_LACR_Service_Manual.pdf"
drive_file_id: "1lmvc4QVp5WJ-1pKRXTo12MDcwAaDF-tC"
drive_view_url: "https://drive.google.com/file/d/1lmvc4QVp5WJ-1pKRXTo12MDcwAaDF-tC/view"
mime_type: "application/pdf"
folder_path: "AI Bank Knowledge/Technicians/SERVICE MANUAL/"
last_modified: "2023-07-04T08:31:03.000Z"
image_reference_note: "Gambar skematik, diagram blok, kurva grafis, dan foto fisik perangkat dapat dilihat langsung pada file asli di link di atas."
extracted_at: "2026-10-18T00:41:18.391135+00:00"
---

# XIR_P3688_Detailed_LACR_Service_Manual.pdf

> 🔗 **Dokumen Asli (Google Drive):** [XIR_P3688_Detailed_LACR_Service_Manual.pdf](https://drive.google.com/file/d/1lmvc4QVp5WJ-1pKRXTo12MDcwAaDF-tC/view)
> 📂 **Lokasi Folder:** `AI Bank Knowledge/Technicians/SERVICE MANUAL/`
> ℹ️ *Catatan AI: Teks dokumen ini adalah salinan lengkap untuk pemrosesan cepat. Untuk diagram, peta sinyal, kurva frekuensi, dan foto produk resolusi tinggi, rujuk langsung ke link dokumen asli.*

---

### Halaman / Page 1

MOTOTRBOTM TWO-WAY RADIOS
DEP 450TM
DETAILED SERVICE 
MANUAL

### Halaman / Page 3

Foreword
This manual covers all models of the  DEP™ 450 series Portable Radios, unless otherwise specified. It includes all the 
information necessary to maintain peak product performance and maximum working time, using levels 1 and 2 
maintenance procedures. This level of service goes down to the board replacement level and is typical of some local 
service centers, Motorola Authorized Dealers, self-maintained customers, and distributors.
Product Safety and RF Exposure Compliance
ATTENTION!
Before using the portable two way product, read the RF Energy Exposure and Safety guide that ships 
with the radio which contains important operating instructions for safe usage and RF energy 
awareness and control for Compliance with applicable Standards and Regulations.
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
© 2013 Motorola Solutions, Inc.
All rights reserved..

### Halaman / Page 4

iii
Document History
The following major changes have been implemented in this manual since the previous edition:
Edition Description Date
68009644001-A Initial Release June 2013

### Halaman / Page 5

iv
Table of Contents
Document History..........................................................................................................  iii
Section 1 Introduction ......................................................................... 1-1
1.0 Notations Used in This Manual ............................................................................1-1
2.0 Radio Description........... ......................................................................................1-1
Section 2 Maintenance ........................................................................ 2-1
1.0 Introduction ............... ...........................................................................................2-1
2.0 Preventive Maintenance............. ..........................................................................2-1
2.1 Inspection ................. ......................................................................................2-1
2.2 Cleaning Procedures ................ ......................................................................2-1
2.3 Safe Handling of CMOS and LD MOS Devices...............................................2-2
3.0 Repair Procedures and Techni ques — General ..................................................2-4
Section 3 Test Equipment and Service Aids ..................................... 3-1
1.0 Recommended Test Equipm ent...........................................................................3-1
2.0 Service Aids .............. ...........................................................................................3-2
3.0 Programming, Testing and Alignm ent Cable .......................................................3-3
Section 4 Radio Information ............................................................... 4-2
1.0 General Controller Block ............ ..........................................................................4-2
1.1 Audio................ ...............................................................................................4-3
1.2 FGU .............. ..................................................................................................4-5
1.3 Receiver............. .............................................................................................4-6
1.4 Transmitter......... .............................................................................................4-7
1.5 Troubleshooting Charts ............ ......................................................................5-8
Troubleshooting Flow Chart for Controller (Sheet 1 of 4) .......................................5-8
Troubleshooting Flow Chart for Controller (Sheet 2 of 4) .......................................5-9
Troubleshooting Flow Chart for Controller (Sheet 3 of 4) .....................................5-10
Troubleshooting Flow Chart for Controller (Sheet 4 of 4) .....................................5-11
Troubleshooting Flow Chart for Receiver .............................................................5-12
Troubleshooting Flow Chart for Transmitter .........................................................5-13
Troubleshooting Flow Chart for VCO....................................................................5-14
Troubleshooting Flow Chart for Audio (Sheet 1 of 2)............................................5-15
Troubleshooting Flow Chart for Audio (Sheet 2 of 2)............................................5-16
Troubleshooting Flow Chart for FGU....................................................................5-17
2.0 Circuit Board/Sc hematic Diagrams and Parts List for UHF................................6-18
 Main Board UHF Top Side PCB No. 84012549002_B ........................................6-18
Main Board UHF Bottom Side PCB No. 84012549002_B ....................................6-19

### Halaman / Page 6

v
Complete Radio Schematic Diagram ................................................................... 6-20
JTAG Connector Schematic Diagram .................................................................. 6-21
Controller Schematic Diagram ............................................................................. 6-22
Memory Schematic Diagram ................................................................................ 6-23
Microprocessor Schematic Diagram (1 of 2) ........................................................ 6-24
Microprocessor Schematic Diagram (2 of 2) ........................................................ 6-25
Power Management and Audio Schematic Diagram (1 of 2) ............................... 6-26
Power Management and Audio Schematic Diagram (2 of 2) ............................... 6-27
Audio Codec and Audio PA Schematic Diagram ................................................. 6-28
Complete UHF RF Schematic Diagram ............................................................... 6-29
Receiver Back End Schematic Diagram .............................................................. 6-30
VCO Schematic Diagram ..................................................................................... 6-31
Transmitter Schematic Diagram........................................................................... 6-32
Receiver Front End Schematic Diagram .............................................................. 6-33
Peripheral Schematic Diagram............................................................................. 6-34
UHF Radio Parts List (84012549002_B).............................................................. 6-35
3.0 Circuit Board/Schematic Di agrams and Parts List for VHF ............................... 6-41
Main Board VHF Top Side PCB No. 84012573001_A ......................................... 6-41
Main Board VHF Bottom Side PCB No. 84012573001_A.................................... 6-42
Complete Radio Schematic Diagram ................................................................... 6-43
JTAG Connector Schematic Diagram .................................................................. 6-44
Controller Schematic Diagram ............................................................................. 6-45
Memory Schematic Diagram ................................................................................ 6-46
Microprocessor Schematic Diagram (1 of 2) ........................................................ 6-47
Microprocessor Schematic Diagram (2 of 2) ........................................................ 6-48
Power Management and Audio Schematic Diagram (1 of 2) ............................... 6-49
VCO Schematic Diagram ..................................................................................... 6-50
Transmitter VCO Buffer Schematic Diagram ....................................................... 6-51
Transmitter Schematic Diagram........................................................................... 6-52
Receiver Front End Schematic Diagram .............................................................. 6-53
Peripheral Schematic Diagram............................................................................. 6-54
VHF Radio Parts List (84012573001_A).............................................................. 6-55
Appendix A Replacement Parts Ordering..............................................A-1
1.0 Basic Ordering Information....... ...........................................................................A-1
2.0 Motorola Online .......... .........................................................................................A-1
Appendix B Motorola Service Ce nters...................................................B-1

### Halaman / Page 7

vi
1.0 Servicing Information .............. ............................................................................ B-1
2.0 Motorola de México, S. A. .................................................................................... B-1
3.0 Motorola de Colombia, Ltd. ..... ............................................................................ B-1
Glossary ..............................................................................................G-1

### Halaman / Page 8

List of Figures vii
List of Figures
Figure 4-1: Controller Block Diagr am............................................................................................ .........  4-2
Figure 4-2: Audio Block Diagram ........................ ...................................................................................  4-3
Figure 4-3: Transmitter Audio: Send Audio Gain Line  Up......................................................................  4-4
Figure 4-4: Receiver Audio: Audi o Gain Line Up ................................................................................... 4 - 4
Figure 4-5: FGU ................................................................................................................. ....................  4-5
Figure 4-6: Receiver...................................... .........................................................................................  4-6
Figure 4-7: Transmitter......................................................................................................... ..................  4-7

### Halaman / Page 9

viii Related Publications
List of Tables
Table 1-1. Radio Frequency Ranges and Power Levels ....................................................................... 1-1
Table 2-2. Lead Free Solder Wire Pa rt Number List ............................................................................. 2-4
Table 2-3. Lead Free Solder Paste Pa rt Number List ........................................................................... 2-4
Table 3-1. Recommended Test Equipment .................. ......................................................................... 3-1
Table 3-2. Service Aids ......................................................................................................... ................ 3-2
Table 3-3. Pin Configuration of Po rtable Programming Cable with TTR ............................................... 3-4
Table 3-4. Pin Configuration of Portable Test Cabl e ............................................................................. 3-4

### Halaman / Page 10

List of Tables ix
Related Publications
Product Safety and RF Exposure ................................................................................................ 6864117B25
*MOTOTRBO™ User Guide CD...................................................................................................HKLN 4344_

### Halaman / Page 11

x Commercial Warranty 
Commercial Warranty
Limited Warranty
MOTOROLA COMMUNICATION PRODUCTS
I. What This Warranty Covers And For How Long
MOTOROLA INC. (“MOTOROLA”) warrants the MOTOROLA manufactured Communication 
Products listed below (“Product”) against defects in material and workmanship under normal use and 
service for a period of time from the date of purchase as scheduled below:
Motorola, at its option, will at no charge either repair the Product (with new or reconditioned parts), 
replace it (with a new or reconditioned Product), or refund the purchase price of the Product during 
the warranty period provided it is returned in accordance with the terms of this warranty. Replaced 
parts or boards are warranted for the balance of the original applicable warranty period. All replaced 
parts of Product shall become the property of MOTOROLA.
This express limited warranty is extended by MOTOROLA to the original end user purchaser only 
and is not assignable or transferable to any other party. This is the complete warranty for the Product 
manufactured by MOTOROLA. MOTOROLA assumes no obligations or liability for additions or 
modifications to this warranty unless made in writing and signed by an officer of MOTOROLA. 
Unless made in a separate agreement between MOTOROLA and the original end user purchaser, 
MOTOROLA does not warrant the installation, maintenance or service of the Product.
MOTOROLA cannot be responsible in any way for any ancillary equipment not furnished by 
MOTOROLA which is attached to or used in connection with the Product, or for operation of the 
Product with any ancillary equipment, and all such equipment is expressly excluded from this 
warranty. Because each system which may use the Product is unique, MOTOROLA disclaims 
liability for range, coverage, or operation of the system as a whole under this warranty.
II. General Provisions
This warranty sets forth the full extent of MOTOROLA'S responsibilities regarding the Product. 
Repair, replacement or refund of the purchase price, at MOTOROLA's option, is the exclusive 
remedy. THIS WARRANTY IS GIVEN IN LIEU OF ALL OTHER EXPRESS WARRANTIES. IMPLIED 
WARRANTIES, INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OF 
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE LIMITED TO THE 
DURATION OF THIS LIMITED WARRANTY . IN NO EVENT SHALL MOTOROLA BE LIABLE FOR 
DAMAGES IN EXCESS OF THE PURCHASE PRICE OF THE PRODUCT, FOR ANY LOSS OF 
USE, LOSS OF TIME, INCONVENIENCE, COMMERCIAL LOSS, LOST PROFITS OR SAVINGS 
OR OTHER INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE 
USE OR INABILITY TO USE SUCH PRODUCT, TO THE FULL EXTENT SUCH MAY BE 
DISCLAIMED BY LAW.
DEP 450 Series Digital Portable Radios Two (2) Years
Product Accessories (Excluding Batteries and Chargers) One (1) Year

### Halaman / Page 12

Commercial Warranty xi
III. State Law Rights (Applicable Only in U.S.A)
SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR 
CONSEQUENTIAL DAMAGES OR LIMITATION ON HOW LONG AN IMPLIED WARRANTY 
LASTS, SO THE ABOVE LIMITATION OR EXCLUSIONS MAY NOT APPLY.
This warranty gives specific legal rights, and there may be other rights which may vary from state to 
state.
IV. How To Get Warranty Service
You must provide proof of purchase (bearing the date of purchase and Product item serial number) 
in order to receive warranty service and, also, deliver or send the Product item, transportation and 
insurance prepaid, to an authorized warranty service location. Warranty service will be provided by 
Motorola through one of its authorized warranty service locations. If you first contact the company 
which sold you the Product, it can facilitate your obtaining warranty service. You can also open a 
Contact Us case on Motorola Online (www.motorola.com/businessonline).
V. What This Warranty Does Not Cover
A. Defects or damage resulting from use of the Product in other than its normal and customary 
manner.
B. Defects or damage from misuse, accident, water, or neglect.
C. Defects or damage from improper testing, operation, maintenance, installation, alteration, 
modification, or adjustment.
D. Breakage or damage to antennas unless caused directly by defects in material workmanship.
E. A Product subjected to unauthorized Product mo difications, disassemblies or repairs (includ-
ing, without limitation, the addition to the Product of non-Motorola supplied equipment) which 
adversely affect performance of the Product or interfere with Motorola's normal warranty 
inspection and testing of the Product to verify any warranty claim.
F. Product which has had the serial number removed or made illegible.
G. Rechargeable batteries if:
- any of the seals on the battery enclosure of cells are broken or show evidence of tamper-
ing.
- the damage or defect is caused by charging or  using the battery in equipment or service 
other than the Product for which it is specified.
H. Freight costs to the repair depot.
I. A Product which, due to illegal or unauthorized alteration of the software/firmware in the Prod-
uct, does not function in accordance with MOTOROLA’s published specifications or the FCC 
type acceptance labeling in effect for the Product at the time the Product was initially distrib-
uted from MOTOROLA.
J. Scratches or other cosmetic damage to Product su rfaces that does not affect the operation of 
the Product.
K. Normal and customary wear and tear.

### Halaman / Page 13

xii Commercial Warranty 
VI. Patent And Software Provisions
MOTOROLA will defend, at its own expense, any suit brought against the end user purchaser to the 
extent that it is based on a claim that the Product or parts infringe a United States patent, and 
MOTOROLA will pay those costs and damages finally awarded against the end user purchaser in 
any such suit which are attributable to any such claim, but such defense and payments are 
conditioned on the following:
A. that MOTOROLA will be notified promptly in wr iting by such purchaser of any notice of such 
claim;
B. that MOTOROLA will have sole co ntrol of the defense of such suit and all negotiations for its 
settlement or compromise; and
C. should the Product or parts become, or in MOTOROLA's opinion be likely to become, the 
subject of a claim of infringement of a United States patent, that such purchaser will permit 
MOTOROLA, at its option and expense, either to procure for such purchaser the right to con-
tinue using the Product or parts or to replace or modify the same so that it becomes nonin-
fringing or to grant such purchaser a credit for the Product or parts as depreciated and accept 
its return. The depreciation will be an equal amount per year over the lifetime of the Product 
or parts as established by MOTOROLA.
MOTOROLA will have no liability with respect to any claim of patent infringement which is based 
upon the combination of the Product or parts furnished hereunder with software, apparatus or 
devices not furnished by MOTOROLA, nor will MOTOROLA have any liability for the use of ancillary 
equipment or software not furnished by MOTOROLA which is attached to or used in connection with 
the Product. The foregoing states the entire liability of MOTOROLA with respect to infringement of 
patents by the Product or any parts thereof.
Laws in the United States and other countries preserve for MOTOROLA certain exclusive rights for 
copyrighted MOTOROLA software such as the exclusive rights to reproduce in copies and distribute 
copies of such Motorola software. MOTOROLA software may be used in only the Product in which 
the software was originally embodied and such software in such Product may not be replaced, 
copied, distributed, modified in any way, or used to produce any derivative thereof. No other use 
including, without limitation, alteration, modification, reproduction, distribution, or reverse 
engineering of such MOTOROLA software or exercise of rights in such MOTOROLA software is 
permitted. No license is granted by implication, estoppel or otherwise under MOTOROLA patent 
rights or copyrights.
VII. Governing Law
This Warranty is governed by the laws of the State of Illinois, USA.

### Halaman / Page 14

Battery and Charger Warranty xiii
Battery and Charger Warranty
Workmanship Warranty
The workmanship warranty guarantees against defects in workmanship under normal use and 
service.
Capacity Warranty
The capacity warranty guarantees 80% of the rated capacity for the warranty duration.
All DEP 450 Batteries Two (2) Years
Lithium-Ion (Li-lon) Batteries One (1) Year

### Halaman / Page 15

Section 1
INTRODUCTION
1.0 Notations Used in This Manual
Throughout the text in this publication, you will notice the use of note and caution notations. These 
notations are used to emphasize that safety hazards exist, and due care must be taken and 
observed.
2.0 Radio Description
The DEP 450 portable radio available in the following frequency ranges and power levels.
These digital radios are among the most sophisticated two-way radios available. They have a robust 
design for radio users who need high performance, quality, and reliability in their daily 
communications. This architecture provides the capability of supporting a multitude of legacy and 
advanced features resulting in a more cost-effective two-way radio communications solution.
NOTE An operational procedure, practice, or condition that is essential to emphasize.
CAUTION indicates a potentially hazardous situation which, if 
not avoided, might result in equipment damage.
Table 1-1.  Radio Frequency Ranges and Power Levels
Frequency Band Bandwidth Power Level
VHF 136–174 MHz 1 or 5 Watt
UHF 403–470 MHz 1 or 4 Watt
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
The only recommended agent for cleaning the external radio surfaces is a 0.5% solution of a mild 
dishwashing detergent in water. The only factory recommended liquid for cleaning the printed circuit 
boards and their components is isopropyl alcohol (100% by volume).
NOTE Internal surfaces should be cleaned only when the radio is disassembled for service or
repair.
The effects of certain chemicals and their vapors can have harmful results on 
certain plastics. Avoid using aerosol sprays, tuner cleaners and other 
chemicals.
!
C a u t i o n

### Halaman / Page 18

Preventive Maintenance 2-2
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
Complementary metal-oxide semiconductor (CMOS) and Laterally Diffused Metal Oxide 
Semiconductor (LDMOS) devices are used in this family of radios, and are susceptible to damage by 
electrostatic or high voltage charges. Damage can be latent, resulting in failures occurring weeks or 
months later. Therefore, special precautions must be taken to prevent device damage during 
disassembly, troubleshooting, and repair. 
Handling precautions are mandatory for CMOS circuits and are especially important in low humidity 
conditions. 
NOTE Always use a fresh supply of alcohol and a clean container to prevent contamination by 
dissolved material (from previous usage).

### Halaman / Page 19

2-3 Preventive Maintenance
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
ground cords, a table mat, and a floor mat.
• Wear a conductive wrist strap in series with a 100k resistor to 
ground. (Replacement wrist straps that connect to the bench top 
covering are Motorola part number 4280385A59).
• Do not wear nylon clothing while handling CMOS/LDMOS devices.
• Do not insert or remove CMOS/L DMOS devices with power applied. 
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

### Halaman / Page 20

Repair Procedures and Techniques — General 2-4
3.0 Repair Procedures an d Techniques — General
Any rework or repair on Environmentally Preferred Products must be done using the appropriate 
lead-free solder wire and lead-free solder paste as stated in the following table:
Parts Replacement and Substitution
When damaged parts are replaced, identical parts should be used. If the identical replacement part 
is not locally available, check the parts list for the proper Motorola part number and order the part.
Rigid Circuit Boards
The family of radios uses bonded, multi-layer, printed circuit boards. Since the inner layers are not 
accessible, some special considerations are required when soldering and unsoldering components. 
The printed through holes may interconnect multiple layers of the printed circuit. Therefore, exercise 
care to avoid pulling the plated circuit out of the hole.
When soldering near connector: 
• Avoid accidentally getting solder in the connector. 
• Be careful not to form solder bridges between the connector pins. 
• Examine your work closely for shorts due to solder bridges.
NOTE Environmentally Prefer red Products (EPP) (refer to t he marking on the printed circuit
boards — examples shown below) were developed and assembled using environmen-
tally preferred components and solder assembly techniques to comply with the Euro-
pean Union’s Restriction of Hazardous Substances (ROHS) Directive 2002/95/EC
and Waste Electrical and El ectronic Equipment (W EEE) Directiv e 2002/96/EC . To
maintain product compliance and reliability, us e only the Motorola specified parts in this
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
11012015002 IPN800610 1000-1700 poise Type 4 (95.5Sn 3.8Ag 0.7Cu)
88.5%
217°C

### Halaman / Page 21

2-5 Repair Procedures and Techniques — General
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

### Halaman / Page 24

Recommended Test Equipment 3-2
Section 3
TEST EQUIPMENT AND SERVICE AIDS
1.0 Recommended Test Equipment
The list of equipment contained in Table 3-1 includes most of the standard test equipment required 
for servicing Motorola portable radios.
Table 3-1.  Recommended Test Equipment
Equipment Characteristics Example Application
Service
Monitor
Can be used as a sub-
stitute for items marked 
with an asterisk (*)
Aeroflex 2975 
(www.aeroflex.com), 
Motorola R2670, or equivalent
Frequency/deviation meter 
and signal generator for 
wide-range troubleshooting 
and alignment
Digital RMS 
Multimeter *
100 µV to 300 V
5 Hz to 1 MHz
10 Mega Ohm Imped-
ance
Fluke 179 or equivalent 
(www.fluke.com)
AC/DC voltage and 
current measurements. 
Audio voltage measurements
RF Signal 
Generator *
100 MHz to 1 GHz
-130 dBm to +10 dBm
FM Modulation 0 kHz to 
10 kHz
Audio Frequency 100 
Hz to 10 kHz
Agilent N5181A 
(www.agilent.com), 
Ramsey RSG1000B 
(www.ramseyelectron-
ics.com), or equivalent
Receiver measurements
Oscilloscope 
*
2 Channel
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
(www.boonton.com) or equiva-
lent
RF level measurements
Power Supply 0 V to 32 V
0 A to 20 A
B&K Precision 1790 
(www.bkprecision.com) 
or equivalent
Voltage supply

### Halaman / Page 25

3-3 Service Aids
2.0 Service Aids
Table 3-2 lists the service aids recommended for working on the radio. While all of these items are 
available from Motorola, most are standard workshop equipment items, and any equivalent item 
capable of the same performance may be substituted for the item listed.
*This kit can be downloaded from http://motorola.com/businessonline
Table 3-2.  Service Aids
Motorola Part 
No. Description Application
RLN4460_ Portable Test Set Enables connection to the audio/accessory 
jack. Allows switching for radio testing.
Customer Programming 
Software
Allows servicer to program radio 
parameters, tune and troubleshoot radios.
PMKN4128_ Portable Programming Cable This cable connects the radio to a USB port 
for radio programming and data 
applications. 
PMKN4156_ Portable Test Cable This ca ble connects the radio to RLN4460 
Portable Test Set for test and 
measurement.
0180305K08EPP 7.5V Universal Battery Eliminator Connects to radio battery eliminator cable.
5886564Z01 RF Adaptor Application adapts radio's antenna port to 
BC cabling of test equipment.
1185937A01 Grease Acts to lubricate parts.
6686533Z01 Chassis and Knob Opener Separates the chassis from the front 
housing.
N/A Flat Square Tip Plastic Tweezer Remove components during disassembly.

### Halaman / Page 26

Programming, Testing and Alignment Cable 3-4
3.0 Programming, Testin g and Alignment Cable
Figure 3-1.  Programming, Testing and Alignment Cable (PMKN4128_) 
“P2”
#1
#4
“P3”
“P1”
#1
#5
#2#1
#3
#5 #4

### Halaman / Page 27

3-5 Programming, Testing and Alignment Cable
Figure 3-2.  Portable Test Cable
Table 3-3.  Pin Configuration of Portable Programming Cable with TTR
CONNECTION
P1 P2 P3 Function
11  VCC(5V)
22 DATA-
33 DATA+
4 BNC Center Pin TTR
5 4 BNC Shell GROUND
Table 3-4.  Pin Configuration of Portable Test Cable
CONNECTION
P1 P2 Function
Pin Pin
1 1,5 GROUND
2 7,24 EXTERNAL MIC
3 16 EXTERNAL 
SPEAKER-
4 17 EXTERNAL 
SPEAKER+
#2
#1#3
#4
“P1”
“P2”
#25 #13
#1#14

### Halaman / Page 28

-1

### Halaman / Page 29

General Controller Block 4-2
Section 4
RADIO INFORMATION
1.0 General Controller Block
The controller section is the central interface between the various subsystems of the radio, namely 
PMIC, RF, peripheral and audio CODEC.
The controller section consists of 4 main ICs. These are the microprocessor OMAPL138 Host/DSP 
Processor (U1000), NAND Flash memory (U2100), mDDR memory (U2000), and Power 
Management Unit PMIC (U3003). Microprocessor (U1000) needs only one clock for operation. That is 
19.2 MHz square-wave @ 1.2V pp. 19.2 MHz clock source is provided by TCXO. The power 
management architecture is centered on the PMIC (U3003). A battery supplies power to a 3.6V step 
down regulator which control by an on off state machine. When the radio is turned on, the on/off state 
machine will enable 3.6V switching regulator to power on PMIC. Radio will be turned-off under one of 
three conditions; they are ONB turned off, low battery, or thermal shutdown.
Figure 4-1: Controller Block Diagram

### Halaman / Page 30

4-3 General Controller Block
1.1 Audio
The audio processing within the radio can be broken into two separate processes: Receive audio and 
Transmit audio. A block diagram of the audio is shown in  Figure 4-2.
Figure 4-2: Audio Block Diagram
The TLV320AIC3100 is a low power, highly integrated, high performance codec which provides a 
stereo audio DAC, a mono audio ADC, and a mono class-D 4Ω speaker driver.
RAW B+
PA_MODE
PA_MUTE
NC
NC
NC
NC
EMA_CS2_GP3_15
AUDIO_SSI_CLK
AUDIO_SSI_FSYNC
AUDIO_SSI_DATA_TX
AUDIO_SSI_DATA_RX
GPIO1_5 (G16)
GPIO1_4 (G18)
GPIO2_7 (B7)
GPIO2_8 (C15)
I2C SDA
I2C_SCL
CODEC
BITCLK
CODEC
FYNC
CODEC
DOUT
CODEC
DIN
NC
SPKP1
SPKP2
SPKM1
SPKM2
HPL
HPR
LILO1_2.8V
MICBIAS (2.5V)
MIC1RP
MIC1LM
INT_MIC
EXT_MIC
Mechanical switch
Q3502
Audio PA: SA58631
INT_SPKR_M
INT_SPKR_PIN_NEG
OUT_NEG
OUT_POS
MOD
J_AJACKTI_CODEC - AIC3100 FREON LITE


> *Catatan: Dokumen memiliki total 96 halaman. Halaman 1-30 telah diekstrak ke dalam teks Markdown.*
