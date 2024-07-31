
interface Year {
  name: string;
}

function generateYears(startYear: number, endYear: number): Year[] {
  const years: Year[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ name: year.toString() });
  }
  return years;
}

export const yearsArray = generateYears(1980, 2024);

export const OfferingsDummy = [
    {
        name: "Introduction to korean",
        price: "free",
        time: "1 hour",
        active: true,
        subType:"One off"
    },
    {
        name: "Introduction to English",
        price: "#40,000",
        time: "30 minutes",
        active: true,
        subType:"Bundle 6 sessions"
    },
    {
        name: "Introduction to Japanese",
        price: "#70,000",
        time: "1 hour",
        active: true,
        subType:"One off"
    },
    {
        name: "Introduction to Japanese",
        price: "free",
        time: "1 hour",
        active: true,
        subType:"One off"
    },
]


export const studentDummy = [
    {
        name: "Ayeni Daniel",
        email: "danie@email.com",
        ref: "12-3456789",
        date:"12/03/2024"
    },
    {
        name: "Ayeni Daniel",
        email: "danie@email.com",
        ref: "12-3456789",
        date:"12/03/2024"
    },
    {
        name: "Ayeni Daniel",
        email: "danie@email.com",
        ref: "12-3456789",
        date:"12/03/2024"
    },
    {
        name: "Ayeni Daniel",
        email: "danie@email.com",
        ref: "12-3456789",
        date:"12/03/2024"
    },
    {
        name: "Ayeni Daniel",
        email: "danie@email.com",
        ref: "12-3456789",
        date:"12/03/2024"
    },
]
export const transactionDummy = [
    {
        date: "12/03/2022",
        status: "pending",
        fees: "$2.00",
        charges: "$1.00",
        total:"$20.00"
    },
    {
        date: "12/03/2022",
        status: "pending",
        fees: "$2.00",
        charges: "$1.00",
        total:"$20.00"
    },
    {
        date: "12/03/2022",
        status: "paid",
        fees: "$2.00",
        charges: "$1.00",
        total:"$20.00"
    },
    {
        date: "12/03/2022",
        status: "paid",
        fees: "$2.00",
        charges: "$1.00",
        total:"$20.00"
    },
]