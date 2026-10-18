---
title: "Xir P8600i Series Detailed service manual.pdf"
original_file_name: "Xir P8600i Series Detailed service manual.pdf"
drive_file_id: "112L8VweP-nbiXsMnXMAVhgUgP4xtstr4"
drive_view_url: "https://drive.google.com/file/d/112L8VweP-nbiXsMnXMAVhgUgP4xtstr4/view"
mime_type: "application/pdf"
folder_path: "AI Bank Knowledge/Technicians/SERVICE MANUAL/"
last_modified: "2021-10-15T03:25:24.000Z"
image_reference_note: "Gambar skematik, diagram blok, kurva grafis, dan foto fisik perangkat dapat dilihat langsung pada file asli di link di atas."
extracted_at: "2026-10-18T00:58:02.940747+00:00"
---

# Xir P8600i Series Detailed service manual.pdf

> 🔗 **Dokumen Asli (Google Drive):** [Xir P8600i Series Detailed service manual.pdf](https://drive.google.com/file/d/112L8VweP-nbiXsMnXMAVhgUgP4xtstr4/view)
> 📂 **Lokasi Folder:** `AI Bank Knowledge/Technicians/SERVICE MANUAL/`
> ℹ️ *Catatan AI: Teks dokumen ini adalah salinan lengkap untuk pemrosesan cepat. Untuk diagram, peta sinyal, kurva frekuensi, dan foto produk resolusi tinggi, rujuk langsung ke link dokumen asli.*

---

### Halaman / Page 1

XPR 7550e
XPR 7580e
XPR 7350e
XPR 7380e
DETAILED 
SERVICE MANUAL
TM
PROFESSIONAL DIGITAL TWO-WAY RADIO SYSTEM
MOTOTRBO™ PORTABLE

### Halaman / Page 3

iii
Foreword
This manual covers all models of the XPR™ Series Portable Radios, unless otherwise specified. It includes all the 
information necessary to maintain peak product performance and maximum working time, using levels 1 and 2 
maintenance procedures. This level of service goes down to the board replacement level and is typical of some local 
service centers, self-maintained customers, and distributors.
Product Safety and RF Exposure Compliance
For a list of Motorola-approved antennas, batteries, and other accessories, visit the following web site: 
http://www.motorolasolutions.com
For a list of Motorola TIA 4950 approved radio models, antennas, batteries, and other accessories, 
please refer to UL Safety manual MN001111A01 enclosed with your radio. 
TIA 4950
The radio models listed in UL Safety Manual MN001111A01, when properly equip with the battery PMNN4489_, is certified 
for use per the classification below:
• Classification Rating Division 1, Class I, Gro ups C, D; Class II Group E, F, G; Class III. T3C.
Tamb = -25°C to +60 °C.
• Classification Rating Division 2, Class I, Groups A, B, C, D.
  
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
Before using this product, read the operating instructions 
for safe usage contained in the Product Safety and RF 
Exposure booklet enclosed with your radio.
Repairs of Motorola TIA 4950 certified intrinsically safe radios must 
must be carried out ONLY by Motorola I.S. trained personnel, who are 
aware of the special parts required and the procedures necessary to 
maintain the TIA 4950 conformance of the product. The Motorola 
internal service centres undergo regular training and receive a 
Motorola internal certification that enables them to conduct TIA 4950 
repairs.
!
C a u t i o n

### Halaman / Page 4

iv
Disclaimer
The information in this document is carefully examined, and is believed to be entirely reliable. However, no responsibility is 
assumed for inaccuracies. Furthermore, Motorola reserves the right to make changes to any products herein to improve 
readability, function, or design. Motorola does not assume any liability arising out of the applications or use of any product 
or circuit described herein; nor does it cover any license under its patent rights nor the rights of others.
Trademarks
MOTOROLA, MOTO, MOTOROLA SOLUTIONS and the Stylized M logo are trademarks or registered trademarks of 
Motorola Trademark Holdings, LLC and are used under license. All other trademarks are the property of their respective 
owners.
©  2016 Motorola Solutions, Inc.
All rights reserved.

### Halaman / Page 5

v
Document History
The following major changes have been implemented in this manual since the previous edition:
Edition Description Date
MN002182A01-AA Initial Release Jan. 2016

### Halaman / Page 6

vi
Table of Contents
Document History........................................................................................................... v
Section 1 Introduction ......................................................................... 1-1
1.0 Notations Used in This Manual ............................................................................1-1
2.0 Radio Description........... ......................................................................................1-1
3.0 Summary of Printed Circuit Boards and Band s Available ....................................1-2
Section 2 Maintenance ........................................................................ 2-1
1.0 Introduction ............... ...........................................................................................2-1
2.0 Preventive Maintenance............. ..........................................................................2-1
2.1 Inspection ................. ......................................................................................2-1
2.2 Cleaning Procedures ................ ......................................................................2-1
2.3 Safe Handling of CMOS and LD MOS Devices...............................................2-2
3.0 Repair Procedures and Techniques  – General....................................................2-4
Section 3 Test Equipment and Service Aids ..................................... 3-1
1.0 Recommended Test Equipm ent...........................................................................3-1
2.0 Service Aids .............. ...........................................................................................3-2
3.0 Programming, Testing and Alignm ent Cable .......................................................3-3
Section 4 Power Up Self-Test ............................................................. 4-1
1.0 Power-Up Error Codes (Display  Model only) .......................................................4-1
2.0 Operational Error Codes ............ ..........................................................................4-2
Section 5 Radio Information ............................................................... 5-1
1.0 General Controller Block ............ ..........................................................................5-1
1.1 FGU .............. ..................................................................................................5-2
1.2 Receiver............. .............................................................................................5-3
1.3 Transmitter......... .............................................................................................5-4
1.4 GNSS/Bluetooth/WiFi ...... ...............................................................................5-5
1.5 Keypad and Display Block ........... ...................................................................5-6
1.6 GOB.............. ..................................................................................................5-7

### Halaman / Page 7

vii
2.0 Troubleshooting Charts .............. ......................................................................... 5-8
Section 6 UHF (403–527 MHz) Information ........................................ 6-1
1.0 Allocation of Schematics and Ci rcuit Boards ....................................................... 6-1
1.1 Controller Circuits.... ....................................................................................... 6-1
2.0 Circuit Board/Schematic Di agrams and Parts List for UHF ................................. 6-3
Section 7 VHF (136–174 MHz) Information ........................................ 7-1
1.0 Allocation of Schematics and Ci rcuit Boards ....................................................... 7-1
1.1 Controller Circuits.... ....................................................................................... 7-1
2.0 Circuit Board/Schematic Diagr ams and Parts List for VHF ................................. 7-3
Section 8 800/900 MHz (800–900 MHz) Information .......................... 8-1
1.0 Allocation of Schematics and Ci rcuit Boards ....................................................... 8-1
1.1 Controller Circuits.... ....................................................................................... 8-1
2.0 Circuit Board/Schematic Di agrams and Parts List for 800/900 MHz ................... 8-3
Section 9 Interface, keypad & GOB Board Information.................... 9-1
1.0 Allocation of Schematics and Ci rcuit Boards ....................................................... 9-1
2.0 Circuit Board/Schematic Diagrams and Parts List for Interface, Keypad and GOB 
Board ................................................................................................................... 9-3
Appendix A Replacement Parts Ordering..............................................A-1
1.0 Basic Ordering Information....... ...........................................................................A-1
2.0 Motorola Online .......... .........................................................................................A-1
3.0 Mail Orders ................. .........................................................................................A-1
4.0 Telephone Orders.............. ..................................................................................A-1
5.0 Fax Orders................ ...........................................................................................A-1
6.0 Parts Identification ...... .........................................................................................A-1
7.0 Product Customer Service........ ...........................................................................A-2
Appendix B Motorola Service Ce nters...................................................B-1
1.0 Servicing Information.............. .............................................................................B-1
2.0 Motorola Service Center ......................................................................................B-1
3.0 Motorola Federal Technical Cent er .....................................................................B-1
Glossary ..............................................................................................G-1

### Halaman / Page 8

viii List of Figures
List of Figures
Figure 5-1. Controller Block Diagram ................... ..................................................................................  5-1
Figure 5-2. FGU ................................................................................................................. ....................  5-2
Figure 5-3. Receiver............................................................................................................ ...................  5-3
Figure 5-4. Transmitter......................................................................................................... ..................  5-4
Figure 5-5. GPS/Bluetooth/WiFi .................................................................................................. ...........  5-5
Figure 5-6. Full Keypad ......................................................................................................... .................  5-6
Figure 5-7. GOB ................................................................................................................. ....................  5-7
Figure 5-8. Troubleshooting Flow Chart for Controller (Sheet 1 of 5) ....................................................  5-8
Figure 5-9. Troubleshooting Flow Chart for Controller (Sheet 2 of 5) ....................................................  5-9
Figure 5-10. Troubleshooting Flow Chart for Controller (Sheet 3 of 5) ..................................................  5-10
Figure 5-11. Troubleshooting Flow Chart for Controller (Sheet 4 of 5) ..................................................  5-11
Figure 5-12. Troubleshooting Flow Chart for Controller (Sheet 5 of 5) ..................................................  5-12
Figure 5-13. Troubleshooting Flow Chart for Receiver (Sheet 1 of 3)....................................................  5-13
Figure 5-14. Troubleshooting Flow Chart for Receiver (Sheet 2 of 3)....................................................  5-14
Figure 5-15. Troubleshooting Flow Chart for Receiver (Sheet 3 of 3)....................................................  5-15
Figure 5-16. Troubleshooting Flow Chart for Transmitter.......................................................................  5-16
Figure 5-17. Troubleshooting Flow Chart for Transmitter(CMOS Section) ............................................  5-17
Figure 5-18. Troubleshooting Flow Chart for VCO (Sheet 1 of 2) ..........................................................  5-18
Figure 5-19. Troubleshooting Flow Chart for VCO (Sheet 2 of 2) ..........................................................  5-19
Figure 5-20. Troubleshooting Flow Chart for VCO 8/900 MHz (Sheet 1 of 2)........................................  5-20
Figure 5-21. Troubleshooting Flow Chart for VCO 8/900 MHz (Sheet 2 of 2)........................................  5-21
Figure 5-22. Troubleshooting Flow Chart for Synthesizer......................................................................  5-22
Figure 5-23. Troubleshooting Flow Chart for GNSS (Sheet 1 of 2)........................................................  5-23
Figure 5-24. Troubleshooting Flow Chart for GNSS (Sheet 2 of 2)........................................................  5-24
Figure 5-25. Troubleshooting Flow Chart for Bluetooth/WiFi (Sheet 1 of 2)...........................................  5-25
Figure 5-26. Troubleshooting Flow Chart for Bluetooth/WiFi (Sheet 2 of 2)...........................................  5-26
Figure 5-27. Troubleshooting Flow Chart for Keypad ............................................................................  5-27
Figure 5-28. Troubleshooting Flow Chart for GOB.................................................................................  5-28
Figure 5-29. Troubleshooting Flow Chart for GOB 2 (Sheet 1 of 2).......................................................  5-29
Figure 5-30. Troubleshooting Flow Chart for GOB 2 (Sheet 2 of 2).......................................................  5-30
Figure 6-1. Main Board UHF Top Si de PCB No. PC000813A01_AB ..................................................... 6-3
Figure 6-2. Main Board UHF Bottom Side PCB No. PC000813A01_AB ................................................ 6-4
Figure 6-3. Complete Radio Circuit .................. ...................................................................................... 6-5
Figure 6-4. GNSS Schematic Diagram ............................................................................................. ..... 6-6
Figure 6-5. Bluetooth and WiFi Schematic Diagram (1 of 3) ...... ............................................................ 6-7
Figure 6-6. Bluetooth and WiFi Schematic Diagram (2 of 3) ...... ............................................................ 6-8
Figure 6-7. Bluetooth and WiFi Schematic Diagram (3 of 3) ...... ............................................................ 6-9
Figure 6-8. Controller Schematic Diagram .......... .................................................................................6-10
Figure 6-9. Memory Schematic Diagram ................ .............................................................................. 6-11
Figure 6-10. Microprocessor Schematic Diagram (1 of 2) ...................................................................... 6-12
Figure 6-11. Microprocessor Schematic Diagram (2 of 2) ...................................................................... 6-13
Figure 6-12. Power Management and Audio Schematic Diagram (1 of 3) ............................................. 6-14
Figure 6-13. Power Management and Audio Schematic Diagram (2 of 3) ............................................. 6-15
Figure 6-14. Power Management and Audio Schematic Diagram (3 of 3) ............................................. 6-16
Figure 6-15. Overall RF Schematic Diagram ........ ................................................................................. 6-17
Figure 6-16. VCO Schematic Diagram (1 of 3) ..... ................................................................................. 6-18
Figure 6-17. VCO Schematic Diagram (2 of 3) ..... ................................................................................. 6-19
Figure 6-18. VCO Schematic Diagram (3 of 3) ..... ................................................................................. 6-20
Figure 6-19. Transmitter Schematic Diagram ....... ................................................................................. 6-21
Figure 6-20. Receiver Schematic Diagram ........... ................................................................................. 6-22
Figure 6-21. RFIC Schematic Diagram ............................................................................................ ...... 6-23

### Halaman / Page 9

List of Figures ix
Figure 6-22. Peripheral Schematic Diagram (1 of 3) ............................................................................. .6 - 2 4
Figure 6-23. Peripheral Schematic Diagram (2 of 3) ............................................................................. .6 - 2 5
Figure 6-24. Peripheral Schematic Diagram (3 of 3) ............................................................................. .6 - 2 6
Figure 6-25. Factory Test Points Schematic Diagram ............................................................................ 6-27
Figure 7-1. Main Board VHF Top Si de PCB No. PC000975A01_AA ..................................................... 7-3
Figure 7-2. Main Board VHF Bottom  Side PCB No. PC000975A01_AA ................................................ 7-4
Figure 7-3. Complete  Radio Schematic Diagram ................................................................................... 7-5
Figure 7-4. GNSS Schematic Diagram ............................................................................................. ..... 7-6
Figure 7-5. Bluetooth and WiFi Schematic Diagram (1 of 3) .................................................................. 7-7
Figure 7-6. Bluetooth and WiFi Schematic Diagram (2 of 3) .................................................................. 7-8
Figure 7-7. Bluetooth and WiFi Schematic Diagram (3 of 3) .................................................................. 7-9
Figure 7-8. Controller Schematic Diagram ....................................................................................... .... 7-10
Figure 7-9. Memory Schematic Di agram .............................................................................................. 7-11
Figure 7-10. Microprocessor Schematic Diagram (1 of 2) ...................................................................... 7-12
Figure 7-11. Microprocessor Schematic Diagram (2 of 2) ...................................................................... 7-13
Figure 7-12. Power Management and Audio Schematic Diagram (1 of 3) ............................................. 7-14
Figure 7-13. Power Management and Audio Schematic Diagram (2 of 3) ............................................. 7-15
Figure 7-14. Power Management and Audio Schematic Diagram (3 of 3) ............................................. 7-16
Figure 7-15. Overall RF Schematic Diagram ...................................................................................... ... 7-17
Figure 7-16. VCO Schematic Diagram (1 of 2) .... .................................................................................. 7-18
Figure 7-17. VCO Schematic Diagram (2 of 2) .... .................................................................................. 7-19
Figure 7-18. Transmitter Schematic Diagram ..................................................................................... ... 7-20
Figure 7-19. Receiver Schematic Diagram ........................................................................................ .... 7-21
Figure 7-20. RFIC Schematic Diagram ............................................................................................ ...... 7-22
Figure 7-21. Peripheral Schematic Diagram (1 of 3) ............................................................................. .7 - 2 3
Figure 7-22. Peripheral Schematic Diagram (2 of 3) ............................................................................. .7 - 2 4
Figure 7-23. Peripheral Schematic Diagram (3 of 3) ............................................................................. .7 - 2 5
Figure 7-24. Factory Test Points Schematic Diagram ............................................................................ 7-26
Figure 8-1. Main Board 800/900 MHz Top Side PCB No. PC000970A01_AA ....................................... 8-3
Figure 8-2. Main Board 800/900 MH z Bottom Side PCB No. PC000970A01_AA ................................. 8-4
Figure 8-3. Complete  Radio Schematic Diagram ................................................................................... 8-5
Figure 8-4. GNSS Schematic Diagram ............................................................................................. ..... 8-6
Figure 8-5. Bluetooth and WiFi Schematic Diagram (1 of 3) .................................................................. 8-7
Figure 8-6. Bluetooth and WiFi Schematic Diagram (2 of 3) .................................................................. 8-8
Figure 8-7. Bluetooth and WiFi Schematic Diagram (3 of 3) .................................................................. 8-9
Figure 8-8. Controller Schematic Diagram ....................................................................................... .... 8-10
Figure 8-9. Memory Schematic Di agram .............................................................................................. 8-11
Figure 8-10. Microprocessor Schematic Diagram (1 of 2) ...................................................................... 8-12
Figure 8-11. Microprocessor Schematic Diagram (2 of 2) ...................................................................... 8-13
Figure 8-12. Power Management and Audio Schematic Diagram (1 of 3) ............................................. 8-14
Figure 8-13. Power Management and Audio Schematic Diagram (2 of 3) ............................................. 8-15
Figure 8-14. Power Management and Audio Schematic Diagram (3 of 3) ............................................. 8-16
Figure 8-15. Overall RF Schematic Diagram ...................................................................................... ... 8-17
Figure 8-16. VCO Schematic Diagram (1 of 4) .... .................................................................................. 8-18
Figure 8-17. VCO Schematic Diagram (2 of 4) .... .................................................................................. 8-19
Figure 8-18. VCO Schematic Diagram (3 of 4) .... .................................................................................. 8-20
Figure 8-19. VCO Schematic Diagram (4 of 4) .... .................................................................................. 8-21
Figure 8-20. Transmitter Schematic Diagram ..................................................................................... ... 8-22
Figure 8-21. Receiver Schematic Diagram ........................................................................................ .... 8-23
Figure 8-22. RFIC Schematic Diagram ............................................................................................ ...... 8-24
Figure 8-23. Peripheral Schematic Diagram (1 of 3) ............................................................................. .8 - 2 5
Figure 8-24. Peripheral Schematic Diagram (2 of 3) ............................................................................. .8 - 2 6
Figure 8-25. Peripheral Schematic Diagram (3 of 3) ............................................................................. .8 - 2 7
Figure 8-26. Factory Test Points Schematic Diagram ............................................................................ 8-28
Figure 9-1. Interface Board Top Si de PCB No. PC000864A01_AA ....................................................... 9-3

### Halaman / Page 10

x List of Figures
Figure 9-2. Interface Board Bottom Side PCB No. PC 000864A01_AA .................................................. 9-4
Figure 9-3. Interface Board Schematic Diagram .... ................................................................................ 9-5
Figure 9-4. Keypad Board Top Side PCB No. PC000865A02_AB ......................................................... 9-6
Figure 9-5. Keypad Board Bottom Side PCB No.PC00 0865A02_AB .................................................... 9-7
Figure 9-6.  Keypad Board Schematic Diagram (1 of 3) ............ ............................................................ 9-8
Figure 9-7. Keypad Board Schematic Diagram (2 of 3) .......................... ............................................... 9-9
Figure 9-8. Keypad Board Schematic Diagram (3 of 3) ....................................................................... 9-10
Figure 9-9. GOB Board Top Side PCB No. PC000957A01_CA ........................................................... 9-11
Figure 9-10. GOB Board Bottom Side PCB No. PC000957A01_CA ..................................................... 9-12
Figure 9-11. GOB Board Schematic Diagram .......... ..............................................................................9 - 1 3

### Halaman / Page 11

List of Tables xi
List of Tables
Table 2-1. Lead Free Solder Wire Part Number List............................................................................. 2-4
Table 2-2. Lead Free Solder Paste Part Number List ........................................................................... 2-4
Table 3-1. Recommended Test Equipment........................................................................................... 3-1
Table 3-2. Service Aids ......................................................................................................... ................ 3-2
Table 3-3. Pin Configuration of Side Connector.................................................................................. .. 3-4
Table 4-4. Power Up Self Codes.................................................................................................. ......... 4-1
Table 4-5. Operational Error Code s ...................................................................................................... 4-2
Table 6-1. UHF Diagrams and Parts List .......................................................................................... .... 6-1
Table 7-1. VHF Diagrams and Parts List.......................................................................................... ..... 7-1
Table 8-1. 800/900 MHz Band  Diagrams and Parts List....................................................................... 8-1
Table 9-1. Interface, Keypad and GOB Diagrams and Pa rts List.......................................................... 9-1
Table 10-1. GOB Diagrams and Parts List......................................................................................... ... 10-1

### Halaman / Page 12

xii Commercial Warranty 
Commercial Warranty
Limited Warranty
MOTOROLA COMMUNICATION PRODUCTS
I. What This Warranty Covers And For How Long
MOTOROLA INC. (“MOTOROLA”) warrants the MOTOROLA manufactured Communication 
Products listed below (“Product”) against defects in material and workmanship under normal use and 
service for a period of time from the date of purchase as scheduled below:
The portables additionally ship with a standard 1-year Repair Service Advantage (RSA) (for U.S. 
customers) or 1-year Extended Warranty (for Canada customers). However, at the time of order, you 
may choose to omit these warranties. For more RSA or Extended Warranty information, please refer 
to the portable price pages or Motorola Online (https://businessonline.motorola.com) > Resource 
Center > Services > Service Product Offerings > Repair Service Advantage or Extended Warranty.
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
XPR Series Digital Portable Radios Three (3) Years
Product Accessories (Excluding Batteries and Chargers) One (1) Year

### Halaman / Page 13

Commercial Warranty xiii
II. General Provisions
This warranty sets forth the full extent of MOTOROLA'S responsibilities regarding the Product. 
Repair, replacement or refund of the purchase price, at MOTOROLA's option, is the exclusive 
remedy. THIS WARRANTY IS GIVEN IN LIEU OF ALL OTHER EXPRESS WARRANTIES. IMPLIED 
WARRANTIES, INCLUDING WITHOUT LIMITATION, IMPLIED WARRANTIES OF 
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE LIMITED TO THE 
DURATION OF THIS LIMITED WARRANTY. IN NO EVENT SHALL MOTOROLA BE LIABLE FOR 
DAMAGES IN EXCESS OF THE PURCHASE PRICE OF THE PRODUCT, FOR ANY LOSS OF 
USE, LOSS OF TIME, INCONVENIENCE, COMMERCIAL LOSS, LOST PROFITS OR SAVINGS 
OR OTHER INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE 
USE OR INABILITY TO USE SUCH PRODUCT, TO THE FULL EXTENT SUCH MAY BE 
DISCLAIMED BY LAW.
III. State Law Rights 
SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR 
CONSEQUENTIAL DAMAGES OR LIMITATION ON HOW LONG AN IMPLIED WARRANTY 
LASTS, SO THE ABOVE LIMITATION OR EXCLUSIONS MAY NOT APPLY .
This warranty gives specific legal rights, and there may be other rights which may vary from state to 
state.
IV. How To Get Warranty Service
You must provide proof of purchase (bearing the date of purchase and Product item serial number) 
in order to receive warranty service and, also, deliver or send the Product item, transportation and 
insurance prepaid, to an authorized warranty service location. Warranty service will be provided by 
Motorola through one of its authorized warranty service locations. If you first contact the company 
which sold you the Product, it can facilitate your obtaining warranty service. You can also call 
Motorola at 1-800-927-2744 US/Canada. 
V. What This Warranty Does Not Cover
A. Defects or damage resulting from use of the Product in other than its normal and customary 
manner.
B. Defects or damage from misuse, accident, water, or neglect.
C. Defects or damage from improper testing, oper ation, maintenance, installation, alteration, 
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

### Halaman / Page 14

xiv Commercial Warranty 
I. A Product which, due to illegal or unauthorized alteration of the software/firmware in the Prod-
uct, does not function in accordance with MOTOROLA’s published specifications or the FCC 
type acceptance labeling in effect for the Product at the time the Product was initially distrib-
uted from MOTOROLA.
J. Scratches or other cosmetic damage to Product surfaces that does not affect the operation of 
the Product.
K. Normal and customary wear and tear.
VI. Patent And Software Provisions
MOTOROLA will defend, at its own expense, any suit brought against the end user purchaser to the 
extent that it is based on a claim that the Product or parts infringe a United States patent, and 
MOTOROLA will pay those costs and damages finally awarded against the end user purchaser in 
any such suit which are attributable to any such claim, but such defense and payments are 
conditioned on the following:
A. that MOTOROLA will be notified promptly in writ ing by such purchaser of any notice of such 
claim;
B. that MOTOROLA will have sole cont rol of the defense of such suit and all negotiations for its 
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

### Halaman / Page 15

Battery and Charger Warranty xv
Battery and Charger Warranty
Workmanship Warranty
The workmanship warranty guarantees against defects in workmanship under normal use and 
service.
Capacity Warranty
The capacity warranty guarantees 80% of the rated capacity for the warranty duration.
All MOTOTRBO Batteries Two (2) Years
IMPRES Chargers (Single-Unit and Multi-Unit, Non-Display) Two (2) Years
IMPRES Chargers (Multi-Unit with Display) One (1) Year
Core Chargers (Single-Unit and Multi-Unit, Non-Display) Two (2) Years
Nickel Metal-Hydride (NiMH) or Lithium-Ion (Li-lon) Batteries 12 Months
IMPRES Batteries, When Used Exclusively with IMPRES 
Chargers
18 Months

### Halaman / Page 16

xvi Battery and Charger Warranty

### Halaman / Page 17

Section 1
INTRODUCTION
1.0 Notations Used in This Manual
Throughout the text in this publication, you will notice the use of note and caution notations. These 
notations are used to emphasize that safety hazards exist, and due care must be taken and 
observed.
2.0 Radio Description
The XPR series portable radios are among the most sophisticated two-way radios available. They 
have a robust design for radio users who need high performance, quality, and reliability in their daily 
communications. This architecture provides the capability of supporting a multitude of legacy and 
advanced features resulting in a more cost-effective two-way radio communications solution.
NOTE An operational procedure, practice, or condition that is essential to emphasize.
CAUTION indicates a potentially hazardous situation which, if 
not avoided, might result in equipment damage.!
C a u t i o n

### Halaman / Page 18

1-2  Summary of Printed Circuit Boards and Bands Available
3.0 Summary of Printed Circui t Boards and Bands Available
Table below lists all the bands available in this manual. 
Frequency 
Band
Bandwidth Power Level PC Board Part Number Board 
Revision
Chapter
VHF 136–174 MHz 1 W – 5 W PC000813A01 A 6
UHF 403–512 MHz 1 W – 4 W PC000975A01 A 7

### Halaman / Page 19

Section 2
MAINTENANCE
1.0 Introduction
This chapter provides details about the following
• Preventive maintenance (inspection and cleaning).
• Safe handling of CMOS and LDMOS devices.
• Repair procedures and techniques.
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
Cleaning External Plastic Surfaces
NOTE Internal surfaces should be cleaned only when the radio is disassembled for service or
repair.
Use all chemicals as prescribed by the manufacturer. Be sure to follow all 
safety precautions as defined on the label or material safety data sheet.
The effects of certain chemicals and their vapors can have harmful results on 
certain plastics. Avoid using aerosol sprays, tuner cleaners and other 
chemicals.
!
C a u t i o n

### Halaman / Page 20

2-2 Preventive Maintenance
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
Handling precautions are mandatory for CMOS/LDMOS circuits and are especially important in low 
humidity conditions. 
NOTE Always use a fresh supply of alcohol and a clean container to prevent contamination by 
dissolved material (from previous usage).

### Halaman / Page 21

Preventive Maintenance 2-3
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
ground cords, a table mat, a floor mat mat, ESD shoes, and an ESD 
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
3.0 Repair Procedures and Techniques – General
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
NOTE Environmentally Preferre d Products (EPP) (ref er to the marking on  the printed circuit
boards – examples shown below) were developed and assembled using environmentally
preferred components and solder assembly techniques to comply with the European
Union’s Restriction of Hazardous Substances (ROHS 2) Directive 2011/65/EU and
Waste Electrical and El ectronic Equipment (WEEE)  Directive 2012/19/EU . To
maintain product compliance and reliability, use only the Motorola specified parts in this
manual.
Table 2-1.  Lead Free Solder Wire Part Number List
Motorola 
Part Number Alloy Flux Type Flux Content by Weight Melting Point Supplier Part number Diameter Weight
1088929Y01 95.5Sn/3.8Ag/0.7Cu RMA Version 2.7-3.2% 217C 52171 0.015” 1lb spool
Table 2-2.  Lead Free Solder Paste Part Number List
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

### Halaman / Page 23

Repair Procedures and Techniques – General 2-5
For soldering components with Hot-Air or infra red solder systems, please check your user guide 
of the solder system to get information on solder temperature and time for the different housings 
of the integrated circuits and other components.

### Halaman / Page 24

2-6 Repair Procedures and Techniques – General

### Halaman / Page 25

Section 3
TEST EQUIPMENT AND SERVICE AIDS
1.0 Recommended Test Equipment
The list of equipment contained in Table 3-1 includes most of the standard test equipment required 
for servicing Motorola portable radios.
Table 3-1.  Recommended Test Equipment
Equipment Characteristics Example Application
Service
Monitor
Can be used as a 
substitute for items marked 
with an asterisk (*)
Aeroflex 3920 
(www.aeroflex.com)
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
FM Modulation 0 kHz to 10 
kHz
Audio Frequency 100 Hz to 
10 kHz
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

### Halaman / Page 26

3-2 Service Aids
2.0 Service Aids
Table 3-2 lists the service aids recommended for working on the radio. While all of these items are 
available from Motorola, most are standard workshop equipment items, and any equivalent item 
capable of the same performance may be substituted for the item listed.
* Version A of the programming cables will not work with the radio.
Table 3-2.  Service Aids
Motorola 
Part No. Description Application
RLN4460_ Portable Test Set Enables connection to the audio/accessory jack. 
Allows switching for radio testing.
RVN5115_ Customer Programming 
Software on CD-ROM
Allows servicer to program radio parameters, tune 
and troubleshoot radios.
PMKN4012_* Portable Programming Cable This cable connects the radio to a USB port for radio 
programming and data applications.
PMKN4013_* Portable Programming, Testing 
& Alignment Cable
This cable connects the radio to a USB port for radio 
programming, testing and alignment.
PMNN4452_ 7.5V Universal Battery Eliminator Connects to radio via battery eliminator cable.
PMLN6154_ RF Adaptor Adapts radio’s ante nna port to BNC cabling of test 
equipment.
PMLN6584_ RF Adaptor Holder Holds RF Adaptor
5880348B33 DMR SMA to BNC RF Adaptor Adapts radio’s antenna port to BNC cabling of test 
equipment.
NLN9839_ Vacuum Pump Kit Allows servicer to test for leakages.
NTN4265_ Pressure Pump  Kit Allows servicer to locate leakages.
5871134M01 Connector Fitting This connector allows the vacuum hose to be 
connected to the radio chassis.
3271133M01 Fitting Seal This seal secures the connector fitting to the radio 
chassis.

### Halaman / Page 27

Programming, Testing and Alignment Cable 3-3
3.0 Programming, Testing and Alignment Cable
Figure 3-1.  Programming, Testing and Alignment Cable
#1
#14#25
#13
#4#1
#2
#12
#11
#1
P1
P2
P3

### Halaman / Page 28

3-4 Programming, Testing and Alignment Cable
Figure 3-2.  Pin Layout of Side Connector
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
slot for accessory
connector hook
1
2
3
4
5
6
7
8
9
10
11
12
GPIO_0
Spkr +
Spkr -
Mic +
Mic -
GPIO_3
GPIO_4
1-Wire
Vbus
D+
D-
GND

### Halaman / Page 29

Section 4
POWER UP SELF-TEST
1.0 Power-Up Error Codes (Display Model only)
Upon powering up, the radio performs certain tests to determine if its basic electronics and software 
are in working order. Any error detected has an associated error code that is presented on the radio 
display. These error codes are intended to be used by a service technician when the radio generates 
the Self Test Fail Tone. If these tests are successfully completed, the radio will generate the Self 
Test Tone.
There are two classes of detectable errors, fatal and non-fatal. If it is considered as a fatal error, then 
the normal radio operation will be inhibited. Fatal errors include hardware errors detected by the 
microprocessor and certain memory errors. These memory errors include incorrect ROM checksum, 
incorrect RAM checksum, and incorrect checksums of codeplug (Persistent Storage) blocks that 
contain operating parameters. If the codeplug block operating parameters are corrupted, operation 
of the unit on the proper frequency, system, and group are in question. Attempts to use this 
information could provide the user with a false sense of security that others are receiving his 
messages. Corrupted codeplug blocks of call IDs, or their associated aliases are considered non-
fatal errors. While the user may be inconvenienced, normal communication is still possible.
Table 4-1.  Power Up Self Codes
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
Fatal Reprogram codeplug.
FAIL 01/92 Secure Codeplug check-
sum error
Fatal Reprogram codeplug.
FAIL 01/A2 Tuning Codeplug block 
checksum is wrong.
Fatal Reprogram codeplug.
FAIL 01/81 ROM Checksum is 
wrong.
Fatal Reprogram FLASH Memory, then retest. If 
message reoccurs, replace main board or 
send radio to nearest Motorola Depot.
FAIL 01/88 Radio RAM Test Failure. Fatal Retest radio by turning it off and turning it on 
again. If message reoccurs, replace main 
board or send radio to nearest Motorola 
Depot.
FAIL 01/90
or 
FAIL 02/90
General hardware test 
failure.
Fatal Retest radio by turning it off and turning it on 
again. If message reoccurs, replace main 
board or send radio to nearest Motorola 
Depot.

### Halaman / Page 30

4-2 Operational Error Codes
2.0 Operational Error Codes
During radio operation, the radio performs dynamic tests to determine if the radio is working properly. 
Problems detected during these tests are presented as error codes on the radio’s display. The 
presence of an error code should prompt a user that a problem exists and that a Motorola Authorized 
MOTOTRBO dealer should be contacted. Use Table 4-5. to aid in understanding particular 
operational error codes.
FAIL 02/81 DSP ROM Checksum is 
wrong.
Fatal Reprogram FLASH Memory, then retest. If 
message reoccurs, replace main board or 
send radio to nearest Motorola Depot.
FAIL 02/82 DSP RAM1 test failure. Fatal Retest radio by turning it off and turning it on 
again. If message reoccurs, replace main 
board or send radio to nearest Motorola 
Depot.
FAIL 02/84 DSP RAM2 test failure. Fatal Retest radio by turning it off and turning it on 
again. If message reoccurs, replace main 
board or send radio to nearest Motorola 
Depot.
FAIL 02/88 DSP RAM test failure. Fatal Retest radio by turning it off and turning it on 
again. If message reoccurs, replace main 
board or send radio to nearest Motorola 
Depot.
FAIL 02/C0 DSP ROM Checksum is 
wrong.
Fatal Retest radio by turning it off and turning it on 
again. If message reoccurs, replace main 
board or send radio to nearest Motorola 
Depot.
No Display Display module is not 
connected properly.
Display module is dam-
aged.
Fatal Check connection between main board and 
display module.
Replace with new display module.
NOTE A non-display radio emits only the Self Test Fail Tone if it fails the self-test.
Table 4-2.  Operational Error Codes
Error Code Description Error Type Corrective Action
FAIL 001 Synthesizer Out-of-Lock NON-FATAL 1. Reprogram the codeplug.
2. Refer to Detailed Service 
Manual.
FAIL 002 Personality checksum or 
system block error
NON-FATAL Reprogram the codeplug.
Table 4-1.  Power Up Self Codes (Continued)
Error Code Description Error Type Corrective Action


> *Catatan: Dokumen memiliki total 205 halaman. Halaman 1-30 telah diekstrak ke dalam teks Markdown.*
