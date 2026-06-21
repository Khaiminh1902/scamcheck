// app/data/legitimate-domains.ts

export type LegitimateOrg = {
  name: string;
  domains: string[];
  keywords: string[];
};

export const LEGITIMATE_ORGS: LegitimateOrg[] = [
  // ===== NGÂN HÀNG =====
  {
    name: "Vietcombank",
    domains: ["vietcombank.com.vn"],
    keywords: ["vietcombank", "vcb"],
  },
  {
    name: "Techcombank",
    domains: ["techcombank.com.vn"],
    keywords: ["techcombank", "tcb"],
  },
  {
    name: "VietinBank",
    domains: ["vietinbank.vn"],
    keywords: ["vietinbank", "viettinbank", "ctg"],
  },
  {
    name: "BIDV",
    domains: ["bidv.com.vn"],
    keywords: ["bidv"],
  },
  {
    name: "MB Bank",
    domains: ["mbbank.com.vn"],
    keywords: ["mbbank", "mb"],
  },
  {
    name: "ACB",
    domains: ["acb.com.vn"],
    keywords: ["acb"],
  },
  {
    name: "Sacombank",
    domains: ["sacombank.com.vn", "sacombank.com"],
    keywords: ["sacombank", "stb"],
  },
  {
    name: "VPBank",
    domains: ["vpbank.com.vn"],
    keywords: ["vpbank"],
  },
  {
    name: "TPBank",
    domains: ["tpb.vn", "tpbank.vn"],
    keywords: ["tpbank", "tpb", "tienphongbank"],
  },
  {
    name: "Agribank",
    domains: ["agribank.com.vn"],
    keywords: ["agribank"],
  },
  {
    name: "SHB",
    domains: ["shb.com.vn"],
    keywords: ["shb", "saigonhanoi"],
  },
  {
    name: "HDBank",
    domains: ["hdbank.com.vn"],
    keywords: ["hdbank"],
  },
  {
    name: "MSB",
    domains: ["msb.com.vn"],
    keywords: ["msb", "maritimebank"],
  },
  {
    name: "OCB",
    domains: ["ocb.com.vn"],
    keywords: ["ocb", "phuongdong"],
  },
  {
    name: "LienVietPostBank",
    domains: ["lienvietpostbank.com.vn"],
    keywords: ["lienvietpostbank", "lpb", "lienviet"],
  },

  // ===== CƠ QUAN NHÀ NƯỚC =====
  {
    name: "Bộ Công an",
    domains: ["bocongan.gov.vn", "mps.gov.vn"],
    keywords: ["bocongan", "congan", "congandanang", "canhsat"],
  },
  {
    name: "Cục An toàn thông tin",
    domains: ["ais.gov.vn"],
    keywords: ["ais", "antoanthongtin"],
  },
  {
    name: "Tổng cục Thuế",
    domains: ["gdt.gov.vn", "thuedientu.gdt.gov.vn"],
    keywords: ["gdt", "tongcucthue", "thuedientu"],
  },

  // ===== VÍ ĐIỆN TỬ / FINTECH =====
  {
    name: "MoMo",
    domains: ["momo.vn"],
    keywords: ["momo"],
  },
  {
    name: "ZaloPay",
    domains: ["zalopay.vn"],
    keywords: ["zalopay", "zalo"],
  },
  {
    name: "VNPay",
    domains: ["vnpay.vn", "vnpayqr.vn"],
    keywords: ["vnpay", "vnpayqr"],
  },

  // ===== GIAO HÀNG =====
  {
    name: "Giao Hàng Nhanh (GHN)",
    domains: ["ghn.vn"],
    keywords: ["ghn", "giaohangnhanh"],
  },
  {
    name: "Giao Hàng Tiết Kiệm (GHTK)",
    domains: ["ghtk.vn", "giaohangtietkiem.vn"],
    keywords: ["ghtk", "giaohangtietkiem"],
  },
  {
    name: "J&T Express",
    domains: ["jtexpress.vn"],
    keywords: ["jtexpress", "jt"],
  },
  {
    name: "Shopee",
    domains: ["shopee.vn"],
    keywords: ["shopee", "spx"],
  },
];

export const SHORTENED_DOMAINS = [
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "goo.gl",
  "is.gd",
  "v.gd",
  "rebrand.ly",
  "ow.ly",
  "buff.ly",
  "dlvr.it",
  "short.link",
  "cutt.ly",
  "rb.gy",
  "s.id",
  "shorturl.at",
];
