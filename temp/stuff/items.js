// Everything on the page comes from this file. Edit freely:
//   price: US dollars; 0 = free; null = "Price TBD"
//   status: "available" | "pending" | "sold"
//   photos: filenames (without .jpg) from the photos/ folder
//   flags / research: only shown in the seller view

const SITE = {
  title: "Stuff for sale",
  intro: "I'm clearing out some electronics, furniture and a home gym. Everything works, it all comes from a non-smoking home, and it's in good used shape unless noted. Prices are open to reasonable offers, especially if you take a few things. Some of the small stuff is free to friends.",
  currency: "USD",
  pickup: "Pickup in Ann Arbor, MI",
  contact: null,         // e.g. { label: "Text me", href: "sms:+15555555555" }
  updated: "2026-11-24",
  url: "https://andrewblinn.com/temp/stuff/",             // the page's address once uploaded, e.g. "https://andrewblinn.com/tmp/sale/"; copied listings then link to it
  listingFooter: "Pickup only, in Ann Arbor. Non-smoking home.",
  footer: "Ask me about anything here. Happy to send more photos.",
  flags: [],
};

const SECTIONS = [
  { id: "computers", name: "TV, monitors & computers" },
  { id: "furniture", name: "Furniture & home" },
  { id: "gym", name: "Home gym" },
  { id: "gadgets", name: "Camera & gadgets" },
  { id: "peripherals", name: "Keyboards, mice & controllers" },
];

const ITEMS = [
  // ---------------------------------------------------------------- computers
  {
    id: "lgc1", section: "computers", short: "LG C1 TV",
    name: "LG C1 55\" 4K OLED TV (OLED55C1PUB)",
    price: 500, retail: "$1,799 new (2021)",
    photos: ["PXL_20230327_202647839", "PXL_20230327_005947841"],
    blurb: "LG's 2021 55-inch 4K OLED. 120 Hz with four HDMI 2.1 ports, so it supports 4K/120 and VRR from a PS5, Xbox Series X or PC. Comes with the original box.",
    specs: ["55\" 4K (3840 × 2160) OLED, 120 Hz", "4× HDMI 2.1 (4K/120, VRR, G-Sync / FreeSync)", "Dolby Vision, HDR10, HLG; Dolby Atmos", "webOS smart TV (Netflix, Prime Video, Disney+ and so on)", "Center pedestal stand; VESA 300 × 200 wall-mountable"],
    included: ["Magic Remote", "Power cable", "Stand", "Original box"],
    condition: "Excellent condition: no burn-in, no issues, clean.",
    links: [
      { label: "Review + photos (RTINGS)", url: "https://www.rtings.com/tv/reviews/lg/c1-oled" },
      { label: "Specs (B&H)", url: "https://www.bhphotovideo.com/c/product/1632396-REG/lg_oled55c1pub_c1pu_55_class_hdr.html" },
    ],
    fb: { title: "LG C1 55\" 4K OLED TV (OLED55C1PUB) – No Burn-In, Original Box", category: "Electronics & computers", condition: "Used - Like New", brand: "LG" },
    flags: [],
    research: {
      notes: "$1,799 at launch in 2021. Used 55\" C1s ask about $450–550 now: a Jawa listing (excellent condition, about 3,000 hours, no burn-in) asks $469; older eBay asks run higher. The original box makes pickup and moving much easier, which buyers value. $500 is fair; $425 is a reasonable floor.",
      comps: [
        { label: "Jawa ask $469", url: "https://www.jawa.gg/product/132096/55-inch-lg-c1-oled-tv" },
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=lg+oled55c1pub&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "u4021qw", section: "computers", short: "40\" Dell",
    name: "Dell UltraSharp 40\" curved 5K2K monitor (U4021QW)",
    price: 700, retail: "$2,100 new at launch",
    photos: ["IMG_5146"],
    blurb: "40-inch curved ultrawide at 5120×2160. One Thunderbolt cable to a laptop carries video, 90 W charging, USB and ethernet, and the built-in KVM lets two computers share one keyboard and mouse.",
    specs: ["39.7\" curved IPS, 5120 × 2160, 60 Hz", "Thunderbolt 3 with 90 W power delivery", "2× HDMI, DisplayPort, USB hub, ethernet, built-in speakers", "Height / tilt / swivel stand"],
    included: ["Stand", "Power cable", "DisplayPort cable", "Original box"],
    condition: "Works perfectly. No dead pixels or scratches; only the normal backlight bleed for a panel like this.",
    links: [
      { label: "Dell product page", url: "https://www.dell.com/en-us/shop/dell-ultrasharp-40-curved-wuhd-monitor-u4021qw/apd/210-becu/monitors-monitor-accessories" },
      { label: "Review + photos (TFTCentral)", url: "https://tftcentral.co.uk/reviews/dell-ultrasharp-u4021qw" },
    ],
    fb: { title: "Dell UltraSharp U4021QW 40\" Curved 5K2K Monitor (Thunderbolt, 90W charging)", category: "Electronics & computers", condition: "Used - Good", brand: "Dell" },
    flags: [],
    research: {
      notes: "Launched at $2,100 in 2021 and since replaced by the 120 Hz U4025QW. One confirmed eBay sale at $815 (Jul 2025); other asks run $550–1,400. $700 leaves room to come down to about $625.",
      comps: [
        { label: "eBay sold $815", url: "https://www.ebay.com/itm/396018521734" },
        { label: "Craigslist ask $900", url: "https://seattle.craigslist.org/oly/sys/d/lacey-dell-40-ultrasharp-u4021qw/7928155189.html" },
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=dell+u4021qw&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "u3415w", section: "computers", short: "34\" Dell",
    name: "Dell UltraSharp 34\" curved ultrawide (U3415W)",
    price: 160, retail: "Originally $1,200",
    photos: ["PXL_20220121_035143621", "PXL_20230319_173428654", "PXL_20230308_180901426-2"],
    blurb: "34-inch curved ultrawide at 3440×1440. The photos show it on my monitor arm (listed separately), in landscape and portrait.",
    specs: ["34\" curved IPS, 3440 × 1440, 60 Hz", "HDMI, DisplayPort, Mini DisplayPort, USB 3.0 hub (no USB-C)", "Built-in 9 W speakers", "VESA 100 mount, so it works on a monitor arm"],
    included: ["Stand", "Power cable", "HDMI cable", "Original box"],
    condition: "Works well. No scratches on the screen; normal light wear on the frame.",
    links: [
      { label: "Review + photos (Notebookcheck)", url: "https://www.notebookcheck.net/Dell-UltraSharp-U3415W-Monitor-Review.147774.0.html" },
      { label: "Dell spec guide (PDF)", url: "https://i.dell.com/sites/csdocuments/Corporate_secure_Documents/en/UltraSharp-34-Monitor-review-guide.pdf" },
    ],
    fb: { title: "Dell UltraSharp U3415W 34\" Curved Ultrawide Monitor 3440x1440", category: "Electronics & computers", condition: "Used - Good", brand: "Dell" },
    flags: [],
    research: {
      notes: "$1,200 new in 2015, now discontinued. eBay asks run $115–350, with no-stand units at the low end. $160 with the stand, or about $110 without.",
      comps: [
        { label: "eBay ask (no stand)", url: "https://www.ebay.com/itm/396027226915" },
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=dell+u3415w&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "p1", section: "computers", short: "ThinkPad P1",
    name: "ThinkPad P1 (1st gen): i7-8850H, Quadro P2000, 4K screen",
    price: 400, retail: "Originally $1,950–2,750",
    photos: ["IMG_6299", "IMG_6300", "IMG_6301", "IMG_5121"],
    blurb: "Lenovo's 15.6-inch mobile workstation from 2018, in the same chassis as the X1 Extreme. Windows 10 has been freshly reset and is at the first-time setup screen.",
    specs: ["Intel Core i7-8850H, 6 cores, 2.6 GHz (up to 4.3 GHz)", "16 GB RAM (2 slots, up to 64 GB)", "NVIDIA Quadro P2000 Max-Q, 4 GB", "512 GB NVMe SSD (WD), second M.2 slot free", "15.6\" 4K (3840 × 2160) IPS, 400 nits, non-touch", "2× Thunderbolt 3, 2× USB-A, HDMI 2.0, SD card reader", "About 4 lb"],
    included: ["135 W Lenovo charger", "Lenovo ethernet adapter"],
    condition: "Lightly used, no cosmetic issues. Battery still in reasonable shape. Freshly reset Windows 10 at the setup screen; it qualifies for the free Windows 11 upgrade.",
    links: [
      { label: "Lenovo spec sheet (PSREF)", url: "https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_P1/ThinkPad_P1_Spec.PDF" },
      { label: "Review + photos (Notebookcheck)", url: "https://www.notebookcheck.net/Lenovo-ThinkPad-P1-Xeon-E-2176M-Quadro-P2000-Max-Q-Workstation-Review.337120.0.html" },
    ],
    fb: { title: "Lenovo ThinkPad P1 Gen 1 – i7-8850H, Quadro P2000, 16GB, 512GB SSD, 15.6\" 4K", category: "Electronics & computers", condition: "Used - Like New", brand: "Lenovo" },
    flags: [],
    research: {
      notes: "$1,949+ new in 2018; with the i7-8850H, P2000 and 4K screen this is near the top configuration (about $2,750 with 4K touch). The comps I found were Canadian; converted, a Gen 1 Xeon/4K/P2000 with no RAM or SSD asked about $290, a Gen 2 i7/16GB/1TB about $380, and a refurbished Xeon/4K/32GB with warranty about $680. $400 is fair for this configuration with a fresh install; check the eBay sold listings before you post.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=thinkpad+p1+gen+1&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "x1carbon", section: "computers", short: "X1 Carbon",
    name: "ThinkPad X1 Carbon (5th gen)",
    price: 200, retail: "Originally $1,350+",
    photos: ["IMG_6296", "IMG_6298", "IMG_6297", "IMG_5120"],
    blurb: "Lenovo's 14-inch ultralight from 2017. Charges over USB-C. Freshly reset Windows 10; the i7-7600U isn't on Windows 11's supported list, and it also runs Linux well.",
    specs: ["Intel Core i7-7600U (2 cores / 4 threads)", "16 GB RAM", "512 GB SSD", "14\" 1080p IPS display", "2× Thunderbolt 3 / USB-C (charging), 2× USB-A, HDMI", "Fingerprint reader", "About 2.5 lb"],
    included: ["USB-C charger", "Lenovo ethernet adapter"],
    condition: "Good shape with light wear. Battery still lasts reasonably long. Freshly reset Windows 10.",
    links: [
      { label: "Lenovo spec sheet (PSREF)", url: "https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_X1_Carbon_5th_Gen/ThinkPad_X1_Carbon_5th_Gen_Spec.PDF" },
      { label: "Review + photos (Notebookcheck)", url: "https://www.notebookcheck.net/Lenovo-ThinkPad-X1-Carbon-2017-Core-i7-Full-HD-Laptop-Review.207160.0.html" },
    ],
    fb: { title: "Lenovo ThinkPad X1 Carbon 5th Gen – i7-7600U, 16GB RAM, 512GB SSD, 14\" 1080p", category: "Electronics & computers", condition: "Used - Good", brand: "Lenovo" },
    flags: [
      "Reminder: write down the Windows password for the buyer.",
    ],
    research: {
      notes: "$1,349+ new in 2017. eBay asks for i7-7600U/16GB units run mostly $145–225; I couldn't find confirmed sold prices. Windows 10 is out of support and this CPU isn't officially Windows 11 compatible, which keeps prices down. $200 is mid-range.",
      comps: [
        { label: "eBay ask", url: "https://www.ebay.com/itm/167478731036" },
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=thinkpad+x1+carbon+5th+gen+i7+16gb&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "ergotron", section: "computers", short: "Ergotron arm",
    name: "Ergotron LX Sit-Stand monitor arm",
    price: 120, retail: "About $360+ new",
    photos: ["IMG_5119", "PXL_20230319_173428654", "PXL_20230308_180901426-2"],
    blurb: "Tall-pole version of Ergotron's LX arm, for desks that switch between sitting and standing. Polished aluminum. The photos show it holding the 34\" Dell, in landscape and portrait.",
    specs: ["Holds monitors up to 25 lb and 42\"", "20\" of up/down travel; tilts, pans and rotates to portrait", "VESA 75 / 100", "Desk clamp fits desks 0.78–2.56\" thick (no through-desk grommet mount)", "Model 45-360-026"],
    included: ["Desk clamp", "VESA screws", "2 Allen keys for tension", "Instructions"],
    condition: "Works great.",
    links: [
      { label: "Ergotron product page", url: "https://www.ergotron.com/en-us/products/product-details/45-360-026" },
      { label: "Spec sheet (PDF)", url: "https://media.ergotron.com/reserved/resources/dim-lxstsdesk-orig.pdf" },
    ],
    fb: { title: "Ergotron LX Sit-Stand Monitor Arm (desk clamp)", category: "Electronics & computers", condition: "Used - Good", brand: "Ergotron" },
    flags: [],
    research: {
      notes: "$360–510 new. A used tall-pole LX on eBay goes for about $125. Your photos show it holding the 34\" U3415W, so that pairing is proven. The 40\" is under the 25 lb limit too, but it's deeper and heavier, so I wouldn't promise it.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=ergotron+lx+sit+stand+45-360-026&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },

  // ---------------------------------------------------------------- furniture
  {
    id: "capisco", section: "furniture", short: "Capisco",
    name: "HÅG Capisco 8106 saddle chair (blue)",
    price: 350, retail: "About $1,300 new",
    photos: ["IMG_5151"],
    blurb: "Saddle-seat office chair designed by Peter Opsvik, suited to standing-height or high desks. You can sit facing forward, sideways or backward.",
    specs: ["Seat height about 18.5–25.5\" (standard lift)", "Adjustable seat depth, back height and tilt tension; tilt lock", "Aluminum 5-star base with built-in foot plates", "Blue fabric"],
    included: [],
    condition: "Everything works and it's in great shape, except some soiling on the front edge of the seat and the backrest, which I'll spot-clean.",
    links: [
      { label: "Flokk (HÅG) product page", url: "https://store.flokk.com/us/en-gb/products/hag-capisco" },
    ],
    fb: { title: "HÅG Capisco 8106 Ergonomic Saddle Chair – Blue", category: "Furniture", condition: "Used - Good", brand: "HÅG" },
    flags: [
      "The photo shows darker soiling on the seat's front edge and the backrest wings, plus lint on top. A spot-clean and lint-roll before photos would help; then tell me what's left so I can describe it accurately.",
    ],
    research: {
      notes: "Flokk doesn't publish a price; US dealers list it around $1,300. Facebook asks elsewhere in the US: $350 (cut from $600), $500 (8106, stained), $650 (with footring). $350 allows for the soiling; ask $400 if it cleans up well.",
      comps: [
        { label: "FB $500 (8106)", url: "https://www.facebook.com/marketplace/item/2497936033992252/" },
        { label: "FB $350", url: "https://www.facebook.com/marketplace/item/1671154337325134/" },
      ],
    },
  },
  {
    id: "lovesac", section: "furniture", short: "Lovesac",
    name: "Lovesac CitySac in Chinchilla Dense Phur (grey faux fur)",
    price: 175, retail: "About $650 new (insert + cover)",
    photos: ["IMG_5137", "IMG_5139"],
    blurb: "Lovesac's mid-size shredded-foam beanbag, about 3 ft across and 35 lb, with a removable, machine-washable Chinchilla Dense Phur faux-fur cover.",
    specs: ["About 3 ft wide × 3 ft 3 in tall, 35 lb", "Durafoam shredded-foam fill (not beads)", "Removable cover: machine-wash cold, line dry"],
    included: ["Foam insert", "Phur cover"],
    condition: "Great. The cover has been washed and has no marks. No pets; non-smoking home.",
    links: [
      { label: "Lovesac CitySac", url: "https://www.lovesac.com/products/citysac-insert" },
      { label: "Chinchilla Dense Phur swatch", url: "https://www.lovesac.com/products/mini-swatch-chinchilla-dense-phur" },
    ],
    fb: { title: "Lovesac CitySac – Chinchilla Dense Phur Faux Fur (grey)", category: "Furniture", condition: "Used - Like New", brand: "Lovesac" },
    flags: [],
    research: {
      notes: "The CitySac insert lists at $400 (often $280 on sale) and covers run about $250–300, so roughly $650 new. Used CitySacs are rarely listed; a used CitySac cover alone asks about $210. $175 for the insert and a clean cover is reasonable; you could start at $200.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=lovesac+citysac&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "snug", section: "furniture", short: "Snugg chair",
    name: "Arhaus Snugg faux-fur chair + ottoman (chocolate brown)",
    price: 300, retail: "Chair lists at $650 new; the matching ottoman (now discontinued) was $599",
    photos: ["IMG_5155", "IMG_5156"],
    blurb: "Arhaus Snugg lounge chair and matching ottoman in chocolate-brown faux fur, with a deep, low, beanbag-style seat. Sold as a pair.",
    specs: ["Chair roughly 45\" W × 39\" D × 32\" H (from a third-party listing)", "Polyfiber fill (not beads)", "Big Bear Chocolate faux fur, or very close"],
    included: ["Chair", "Ottoman"],
    condition: "Great condition, light use. No pets; non-smoking home.",
    links: [
      { label: "Arhaus Snugg chair", url: "https://www.arhaus.com/products/snugg-faux-fur-chair" },
    ],
    fb: { title: "Arhaus Snugg Faux Fur Lounge Chair + Ottoman (Chocolate)", category: "Furniture", condition: "Used - Like New", brand: "Arhaus" },
    flags: [],
    research: {
      notes: "Arhaus currently has the chair alone on sale for $400 new (list $650). The matching ottoman is discontinued (it was $599, or $299 on sale). $300 for the pair in great condition is fair next to a $400 new chair; $250 is a reasonable floor.",
      comps: [
        { label: "FB chair $250", url: "https://www.facebook.com/marketplace/item/1904998366600548/" },
      ],
    },
  },
  {
    id: "lamp", section: "furniture", short: "Light therapy lamp",
    name: "DayBright light therapy lamp (full size, 10,000 lux)",
    price: 70, retail: "About $200 new",
    photos: ["IMG_5147", "IMG_5150"],
    blurb: "Full-size 10,000-lux light therapy lamp in a geometric solid-wood frame. Dimmable, so it also works as a regular lamp.",
    specs: ["10,000 lux at full brightness; full-spectrum, UV-free LEDs", "Dimmable, with adjustable color temperature", "Solid wood frame with frosted panels"],
    included: ["Remote", "Power cord (built in)"],
    condition: "Works well.",
    links: [
      { label: "DayBright on Amazon", url: "https://www.amazon.com/s?k=DayBright+light+therapy+lamp+full+size" },
    ],
    fb: { title: "DayBright Light Therapy Lamp – 10,000 Lux, Full Size, Solid Wood Frame", category: "Household", condition: "Used - Like New", brand: "DayBright" },
    flags: [],
    research: {
      notes: "The full-size DayBright lists at about $199 new. Light therapy lamps usually resell for a third to a half of new, so $70 is a fair start. It's a good one to list in December and January, when demand peaks.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=daybright+light+therapy+lamp&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },

  // ---------------------------------------------------------------- gym
  {
    id: "gymbundle", section: "gym", bundle: true, short: "Gym bundle",
    name: "Complete home gym: rack, bench, bar & 255 lb of plates",
    price: 375, retail: "About $750 new for everything",
    photos: ["IMG_5107", "IMG_5112", "IMG_5110", "IMG_5113"],
    blurb: "Everything in this section as one lot: Fitness Reality power cage, flat bench, 7 ft Olympic bar and 255 lb of cast-iron plates, for less than the pieces separately. The rack needs to come apart for pickup; I have tools you can use.",
    specs: ["Rack footprint about 51\" × 47\", 84\" tall (allow a 7 ft+ ceiling)", "Rack rated 800 lb, bench 700 lb", "Four plate-storage horns"],
    included: ["Power rack", "Flat bench", "Olympic bar + collars", "255 lb of plates", "Floor mats, if you want them"],
    condition: "Surface rust and dust from a few years of outdoor storage. Structurally solid.",
    links: [],
    fb: { title: "Home Gym: Fitness Reality Power Rack + Bench + Olympic Bar + 255 lb Plates", category: "Sports & outdoors", condition: "Used - Fair" },
    flags: [],
    research: {
      notes: "The pieces add up to $415 separately, so $375 is a bundle discount. I wouldn't go below about $325.",
    },
  },
  {
    id: "rack", section: "gym", short: "Rack",
    name: "Fitness Reality 810XLT power cage",
    price: 180, retail: "Lists at $379",
    photos: ["IMG_5112", "IMG_5107"],
    blurb: "Four-post power cage with a multi-grip pull-up bar, two bar catches and full-length safety bars. It needs to come apart for pickup; I have tools you can use.",
    specs: ["50.5\" L × 46.5\" W × 83.5\" H", "Rated 800 lb", "2\" × 2\" steel, 19 height positions", "Multi-grip pull-up bar", "About 133 lb"],
    included: ["All bolts", "2 bar catches (J-hooks)", "2 safety bars", "Plate-storage horns", "Floor mats, if you want them"],
    condition: "Structurally solid. Surface rust and dust from a few years of outdoor storage.",
    links: [
      { label: "Review + photos (Garage Gym Reviews)", url: "https://www.garagegymreviews.com/fitness-reality-810xlt-review" },
      { label: "Amazon listing", url: "https://www.amazon.com/dp/B01NBOVAIJ" },
    ],
    fb: { title: "Fitness Reality 810XLT Power Cage / Squat Rack with Pull-Up Bar", category: "Sports & outdoors", condition: "Used - Fair", brand: "Fitness Reality" },
    flags: [],
    research: {
      notes: "Lists at $379 and often goes on sale for about $200. An 810XLT sold for $200 on Facebook (Colorado). $180 allows for the rust.",
      comps: [
        { label: "FB sold $200", url: "https://www.facebook.com/marketplace/item/1210303562890021/" },
      ],
    },
  },
  {
    id: "weights", section: "gym", short: "Bar + plates",
    name: "Olympic bar + 255 lb Fitness Gear plates",
    price: 200, retail: null,
    photos: ["IMG_5110", "IMG_5108", "IMG_5109", "IMG_5111"],
    blurb: "7 ft Olympic barbell with spring collars, and a set of Fitness Gear cast-iron tri-grip plates (2\" holes).",
    specs: ["255 lb of plates: a pair each of 45, 35, 25, 10 and 2.5 lb, plus four 5s", "7 ft Olympic bar, about 45 lb, 2\" sleeves, straight", "Spring collars"],
    included: [],
    condition: "Surface rust from a few years of outdoor storage; otherwise fine.",
    links: [
      { label: "Plate photo (Dick's)", url: "https://dks.scene7.com/is/image/GolfGalaxy/16FGEUFG45LBLYCSTWPL?wid=800&fmt=jpg" },
    ],
    fb: { title: "Olympic Barbell + 255 lb Cast Iron Weight Plates (Fitness Gear)", category: "Sports & outdoors", condition: "Used - Fair", brand: "Fitness Gear" },
    flags: [],
    research: {
      notes: "Fitness Gear is Dick's Sporting Goods' house brand. Used iron plates usually go for $0.70–1.20/lb. I priced these at about $0.60/lb because of the rust: about $155 for 255 lb, plus $45 for the bar, rounded to $200.",
    },
  },
  {
    id: "bench", section: "gym", short: "Bench",
    name: "CheerTran flat weight bench",
    price: 35, retail: "About $100 new",
    photos: ["IMG_5113", "IMG_5114"],
    blurb: "Welded flat bench with transport wheels. Fits inside the rack.",
    specs: ["47\" L × 21\" W × 18\" H", "Rated 700 lb", "2.5\" thick pad", "Transport wheels"],
    included: [],
    condition: "Solid; the pad has no rips, cracks or mildew. Some rust on the frame from outdoor storage.",
    links: [
      { label: "Amazon listing", url: "https://www.amazon.com/dp/B08BTD6PWQ" },
    ],
    fb: { title: "CheerTran Flat Weight Bench (700 lb rated)", category: "Sports & outdoors", condition: "Used - Fair", brand: "CheerTran" },
    flags: [],
    research: {
      notes: "About $70–130 new on Amazon (currently unavailable). Basic used flat benches go for $25–45.",
    },
  },

  // ---------------------------------------------------------------- gadgets
  {
    id: "olympus", section: "gadgets", short: "Olympus",
    name: "Olympus OM-D E-M10 Mark II + 14–42mm pancake zoom",
    price: 400, retail: "Originally about $800 with this lens",
    photos: ["IMG_5059", "IMG_5060", "IMG_5129"],
    blurb: "Compact mirrorless camera with an electronic viewfinder and in-body stabilization, with Olympus's motorized 14–42mm pancake zoom, which retracts nearly flat.",
    specs: ["16 MP Micro Four Thirds sensor", "5-axis in-body image stabilization", "Electronic viewfinder, 3\" tilting touchscreen, Wi-Fi", "8.5 fps bursts, 1080p video", "M.Zuiko 14–42mm f/3.5–5.6 EZ power-zoom pancake lens"],
    included: ["Battery", "Charger", "SD card", "USB cable", "Original box"],
    condition: "Great condition, no scratches. Settings reset.",
    links: [
      { label: "Olympus support page", url: "https://learnandsupport.getolympus.com/support/e-m10-mark-ii" },
      { label: "Review + photos (Imaging Resource)", url: "https://www.imaging-resource.com/cameras/olympus-e-m10-ii-review/" },
    ],
    fb: { title: "Olympus OM-D E-M10 Mark II + 14-42mm EZ Pancake Lens (boxed)", category: "Electronics & computers", condition: "Used - Like New", brand: "Olympus" },
    flags: [],
    research: {
      notes: "About $800 with this lens in 2015, now discontinued. MPB (a US used-camera dealer) sells the body for $334–409 plus this lens for $164–209. eBay sales of this kit run about $375–450, so $400 is mid-range.",
      comps: [
        { label: "MPB body", url: "https://www.mpb.com/en-us/product/olympus-om-d-e-m10-mark-ii" },
        { label: "MPB lens", url: "https://www.mpb.com/en-us/product/olympus-m-zuiko-digital-ed-14-42mm-f-3-5-5-6-ez" },
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=olympus+e-m10+mark+ii+14-42+ez&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "pixelwatch", section: "gadgets", short: "Pixel Watch",
    name: "Google Pixel Watch (1st gen, LTE), Champagne Gold",
    price: 60, retail: "Originally $399",
    photos: ["IMG_6305", "IMG_5124"],
    blurb: "First-gen Pixel Watch, LTE version: with a carrier eSIM plan it can take calls and texts away from your phone. Fitbit heart-rate, sleep and activity tracking.",
    specs: ["41 mm stainless-steel case, champagne gold, hazel band", "LTE + Bluetooth + Wi-Fi, water resistant to 50 m", "Fitbit health and sleep tracking", "Android only; Google's software updates ended in Oct 2025"],
    included: ["Charger", "Band (one size)", "Original box"],
    condition: "Good, lightly used. Battery was fine when I last used it.",
    links: [
      { label: "Google specs", url: "https://support.google.com/googlepixelwatch/answer/12651869" },
      { label: "More photos", url: "https://www.gadcet.com/products/google-pixel-watch-lte-android-smartwatch-with-activity-heart-rate-tracking-champagne-gold-stainless-steel-case-with-hazel-band" },
    ],
    fb: { title: "Google Pixel Watch (1st Gen) LTE – Champagne Gold, Boxed", category: "Electronics & computers", condition: "Used - Good", brand: "Google" },
    flags: [
      "Reminder: factory reset it, remove it from your Google account, and cancel or remove the eSIM plan before handing it over.",
    ],
    research: {
      notes: "$399 at launch (2022). Woot cleared new ones at $70 in May 2025, which sank used prices. The used asks I found were about $60–70.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=google+pixel+watch+lte+41mm&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "lectrofan", section: "gadgets", short: "LectroFan",
    name: "LectroFan Classic white noise machine",
    price: 20, retail: "About $50 new",
    photos: ["IMG_6308", "IMG_5125"],
    blurb: "White noise and fan sound machine. The sounds are generated rather than looped.",
    specs: ["20 sounds: 10 fan sounds, 10 white/pink/brown noise", "Sleep timer", "USB-powered (adapter included)"],
    included: ["USB cable + wall adapter", "Original box and manual"],
    condition: "Works.",
    links: [
      { label: "LectroFan Classic", url: "https://www.soundofsleep.com/product/lectrofan-classic/" },
    ],
    fb: { title: "LectroFan Classic White Noise Sound Machine (boxed)", category: "Household", condition: "Used - Good", brand: "LectroFan" },
    flags: [],
    research: {
      notes: "$45–55 new and still sold. The eBay median is about $22 across 43 sales.",
      comps: [
        { label: "eBay sales summary", url: "https://underpricedai.com/worth/lectrofan-classic-white-noise-fan-sound-machine-travelusb" },
      ],
    },
  },
  {
    id: "amp", section: "gadgets", short: "SMSL DAC/amp",
    name: "S.M.S.L SD-793II DAC + headphone amp",
    price: 30, retail: "About $70 new",
    photos: ["IMG_6302", "IMG_6303"],
    blurb: "Compact DAC and headphone amp. Takes optical or coaxial digital audio from a TV, console or computer and outputs to headphones, or over RCA to powered speakers.",
    specs: ["Inputs: optical (Toslink) and coaxial; SELECT switches between them", "Outputs: ¼\" (6.35 mm) headphone jack, RCA line out", "TI PCM1793 DAC, OPA2134 headphone amp, up to 24-bit/96 kHz", "External power supply"],
    included: ["Power supply", "Optical (Toslink) cable"],
    condition: "Works.",
    links: [
      { label: "Product + photos (Drop)", url: "https://drop.com/buy/smsl-sd-793ii-dac-amp" },
      { label: "Specs (Playstereo)", url: "https://www.playstereo.com/en/digital-to-analogue-converters/4859-smsl-sd-793ii-mini-dac-with-analogue-rca-and-headphone-outputs.html" },
    ],
    fb: { title: "SMSL SD-793II DAC + Headphone Amp (optical/coax in, RCA out)", category: "Electronics & computers", condition: "Used - Good", brand: "S.M.S.L" },
    flags: [],
    research: {
      notes: "Discontinued; it sold new for about $70. A European dealer sells refurbished ones for €52. I couldn't find recent US sold prices, so $30 is an estimate. Budget DAC/amps like this sell slowly, so it may end up a friend giveaway.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=smsl+sd-793ii&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },

  // ---------------------------------------------------------------- peripherals
  {
    id: "filco", section: "peripherals", short: "Filco",
    name: "Filco Majestouch-2 Ninja Tenkeyless mechanical keyboard (Cherry MX Brown)",
    price: 70, retail: "About $130 new",
    photos: ["IMG_6304", "IMG_5123"],
    blurb: "Tenkeyless (no number pad) mechanical keyboard with Cherry MX Brown switches. On the Ninja version the key labels are printed on the front edge of each key, so the tops look blank.",
    specs: ["Cherry MX Brown switches (tactile, not clicky)", "Tenkeyless, 87 keys, US layout", "Full n-key rollover", "Detachable USB cable"],
    included: ["Original box"],
    condition: "Good; all keys work.",
    links: [
      { label: "Product + photos (The Keyboard Co.)", url: "https://www.keyboardco.com/keyboard/usa-filco-ninja-majestouch-2-tenkeyless-nkr-tactile-action-keyboard.asp" },
    ],
    fb: { title: "Filco Majestouch-2 Ninja TKL Mechanical Keyboard – Cherry MX Brown", category: "Electronics & computers", condition: "Used - Good", brand: "Filco" },
    flags: [],
    research: {
      notes: "About £125 new (UK); its successor, the Majestouch 3 Ninja TKL, is about $130. eBay asks run $68–100, and Browns are the most popular all-round switch, so $70 should sell quickly.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=filco+majestouch+ninja+tenkeyless&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "ratmouse", section: "peripherals", short: "M.M.O. 7 mouse",
    name: "Cyborg (Mad Catz) M.M.O. 7 gaming mouse",
    price: 30, retail: "Originally $130",
    photos: ["IMG_6310"],
    blurb: "Adjustable wired gaming mouse: the palm rest, pinkie rest, length and weight all adjust. 13 programmable buttons.",
    specs: ["6400 DPI laser", "13 programmable buttons + 3-mode switch", "Adjustable palm and pinkie rests, removable weights", "Wired, braided cable"],
    included: [],
    condition: "Great condition.",
    links: [
      { label: "Review + photos (ThinkComputers)", url: "https://thinkcomputers.org/cyborg-m-m-o-7-gaming-mouse-review/2/" },
    ],
    fb: { title: "Cyborg / Mad Catz M.M.O. 7 Gaming Mouse (adjustable, 13 buttons)", category: "Electronics & computers", condition: "Used - Like New", brand: "Mad Catz" },
    flags: [],
    research: {
      notes: "$130 new in 2012, now discontinued (Mad Catz sells an M.M.O. 7+ now). There are few real comps and asking prices vary wildly, so $30 is an estimate.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=cyborg+mmo+7+mouse&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "mxmaster", section: "peripherals", short: "MX Master 3",
    name: "Logitech MX Master 3 mouse (mid grey)",
    price: 25, retail: "Originally $100",
    photos: ["IMG_6309"],
    blurb: "Logitech's wireless productivity mouse, with a MagSpeed metal scroll wheel and a thumb wheel. Pairs with up to 3 devices over Bluetooth or the USB receiver.",
    specs: ["USB-C rechargeable (cable not included)", "Bluetooth + Unifying receiver, 3 devices", "Programmable buttons, gesture button"],
    included: ["Logitech Unifying USB receiver"],
    condition: "Works perfectly. The soft-touch coating has worn off in patches.",
    links: [
      { label: "Product photos", url: "https://www.buildcores.com/products/Mouse/vcz21nr8f/Logitech-MX-Master-3-Advanced-Wireless-Mouse-Mid-Grey" },
    ],
    fb: { title: "Logitech MX Master 3 Wireless Mouse (works great, worn coating)", category: "Electronics & computers", condition: "Used - Fair", brand: "Logitech" },
    flags: [],
    research: {
      notes: "$100 new (2019), since replaced by the 3S. Used ones in good shape go for about $50; the worn coating justifies about half that. The close-up shows the wear honestly, which heads off complaints.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=logitech+mx+master+3&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "k830", section: "peripherals", short: "K830",
    name: "Logitech K830 illuminated living-room keyboard",
    price: 25, retail: "Originally $100",
    photos: ["IMG_5122"],
    blurb: "Slim wireless backlit keyboard with a built-in touchpad, for a TV PC or media box. Rechargeable over USB.",
    specs: ["Backlit keys with ambient light sensor", "Built-in touchpad", "Unifying wireless receiver, about 10 m range", "Rechargeable over USB (cable not included)"],
    included: ["Unifying USB receiver", "Original box"],
    condition: "Good.",
    links: [
      { label: "Review + photos (New Atlas)", url: "https://newatlas.com/logitech-illuminated-living-room-keyboard-k830-review/32861" },
    ],
    fb: { title: "Logitech K830 Illuminated Living-Room Keyboard + Touchpad (boxed)", category: "Electronics & computers", condition: "Used - Good", brand: "Logitech" },
    flags: [],
    research: {
      notes: "$100 new (2014), now discontinued. Comps are thin: one eBay.de sale of about $46 with the receiver, and one Toronto ad at about $15.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=logitech+k830&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "steamcontroller", section: "peripherals", short: "Steam Controller",
    name: "Steam Controller (original 2015 model)",
    price: 40, retail: "Originally $50",
    photos: ["IMG_5127"],
    blurb: "Valve's original 2015 Steam Controller (not the 2026 model): two clickable haptic trackpads, a gyro and back grip buttons.",
    specs: ["Dual haptic trackpads + thumbstick, gyro", "Wireless USB dongle or micro-USB cable", "Runs on 2 AA batteries"],
    included: ["Wireless USB dongle"],
    condition: "Good; everything works, battery door included.",
    links: [
      { label: "Steam store page", url: "https://store.steampowered.com/app/353370/Steam_Controller/" },
      { label: "Price history (PriceCharting)", url: "https://www.pricecharting.com/game/pc-games/steam-controller" },
    ],
    fb: { title: "Valve Steam Controller – Original 2015 Model", category: "Video games", condition: "Used - Good", brand: "Valve" },
    flags: [],
    research: {
      notes: "$50 new in 2015. Recent loose sales are $35–56 (Aug–Sep 2026). Valve launched a new Steam Controller in May 2026, so put \"original 2015\" in the title.",
      comps: [
        { label: "eBay sold listings", url: "https://www.ebay.com/sch/i.html?_nkw=steam+controller+original+2015&LH_Sold=1&LH_Complete=1" },
      ],
    },
  },
  {
    id: "xbox360", section: "peripherals", short: "Xbox 360 pad",
    name: "Xbox 360 wireless controller (white) + PC receiver",
    price: 10, retail: null,
    photos: ["IMG_5126"],
    blurb: "White Xbox 360 wireless controller with Microsoft's wireless receiver for PC. Works with PC games and emulators.",
    specs: ["Wireless; runs on 2 AA batteries"],
    included: ["Xbox 360 wireless receiver for PC"],
    condition: "Works. Some wear; it'll get a clean first.",
    links: [
      { label: "How to use one on a PC", url: "https://www.howtogeek.com/178881/ask-htg-how-can-i-hook-up-my-xbox-360-controllers-to-my-computer/" },
    ],
    fb: { title: "Xbox 360 Wireless Controller (White) + PC Wireless Receiver", category: "Video games", condition: "Used - Fair", brand: "Microsoft" },
    flags: [],
    research: {
      notes: "Loose wireless controllers go for about $13 and the PC receiver alone for about $10–15. $10 for both is a giveaway price, which matches your plan.",
      comps: [
        { label: "PriceCharting", url: "https://www.pricecharting.com/game/xbox-360/white-xbox-360-wireless-controller" },
      ],
    },
  },
];
