export const DOC_TYPE_OPTIONS = [
    { value: "ID_CARD", label: "ID Card" },
    { value: "PASSPORT", label: "Passport" },
    { value: "DRIVING_LICENSE", label: "Driving License" },
    { value: "CONTRACT", label: "Contract" },
];

export const EMPLOYEE_DOCUMENTS = [
    { id: 0, type: "CV", filename: "cv.pdf", size: "3 MB", pages: 2, url: "/docs/CV.pdf" },
    { id: 1, type: "Offer", filename: "offer.docx", size: "3 MB", pages: 2, url: "/docs/offer.docx" },
    {
        id: 1,
        type: "Contract",
        filename: "employment_contract.pdf",
        size: "3 MB",
        pages: 2,
        url: "/sample-docs/employment_contract.pdf",
    },
    {
        id: 2,
        type: "ID Card",
        filename: "national_id.pdf",
        size: "1 MB",
        pages: 1,
        url: "/sample-docs/national_id.pdf",
    },
    {
        id: 3,
        type: "Certificate",
        filename: "degree_certificate.pdf",
        size: "2 MB",
        pages: 1,
        url: "/sample-docs/degree_certificate.pdf",
    },
    {
        id: 4,
        type: "Reference",
        filename: "reference_letter.pdf",
        size: "1 MB",
        pages: 2,
        url: "/sample-docs/reference_letter.pdf",
    },
];

export const LEAVE_BALANCES = [
    { id: 1, type: "Annual", remaining: 14, total: 21 },
    { id: 2, type: "Sick", remaining: 7, total: 10 },
    { id: 3, type: "Maternity", remaining: 90, total: 90 },
];

export const LEAVE_HISTORY = [
    { id: 1, dateRange: "May 20 – May 25, 2026", type: "Annual", status: "Approved", justification: "Family vacation" },
    { id: 2, dateRange: "Apr 10, 2026", type: "Sick", status: "Approved", justification: "Medical appointment" },
    { id: 3, dateRange: "Jun 01 – Jun 03, 2026", type: "Annual", status: "Pending", justification: "Personal reasons" },
];
