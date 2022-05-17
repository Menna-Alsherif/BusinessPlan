import React, { useEffect, createContext, useReducer } from "react";
import { Reducer } from "./QuestionsReducer";

// Initial State
const initialState = {
  step: 1,
  sectionClientBriefQuestions: {
   
    Q1: {
      Question: "Choose your startup industry from the list below.",
      options: [
        "N/A",
        "E-commerce",
        "Fintech",
        "Logistics & Warehousing",
        "Mobility & Transport",
        "Food & Beverage",
        "Consumer & Retail",
        "Healthcare",
        "Fitness & Wellness",
        "Education",
        "Real Estate & Hospitality",
        "Technology & Internet of Things", 
        "Manufacturing",
        "Marketing",
        "Accounting",
        "Other",
      ],
      Tooltip: "Select 'Other' if your industry is not among the choices; and write it down in the custom space.",
      Placeholder: { P1: "Enter Sector name" },
    },
    Q2: {
      Question: "How would you describe the development stage of your product ?",
      options: ["N/A", "Idea Stage", "MVP Developed", "Product Launched"],
      Tooltip: "'Idea Stage' refers to products under-design, 'MVP developed' refers to prototypes, and 'Developed' refers to launched products.",
    },
    Q3: {
      Question: "Has your startup been established ?",
      options: ["N/A", "Yes", "No"],
      Tooltip: "Establishment refers to the legal founding of your startup.",
    },
    Q4: {
      Question: "What is the actual or planned date of establishment and paid-in capital ?",
      Tooltip: "Your Startup actual or planned establishment date and paid-in capital (in EGP), will help estimate the future funding needs.",
      Placeholder: { P1: "Enter Amount in EGP" },
    },
    Q5: {
      Question: "Has your startup previously raised funding from investors ? (This excludes founders’ paid-in capital)",
      options: ["N/A", "Yes", "No"],
      Tooltip: "Your input regarding previous funding rounds improves future funding needs predictability.",
    },
    Q6: {
      Question: "Define the date of funding, the value raised and investor stake percentage.",
      Tooltip: "Your input regarding funding raised (in EGP), leads to accurate predictability of funding surplus (deficit) and hence, capital table formulation.",
      Placeholder: { P1: "Enter Amount in EGP", P2: "Enter %" },
    },
    Q7: {
      Question: "Define each founders’ name, role and stake ownership.",
      Tooltip: "Your input leads to tailoring your shareholders (capital) table accurately. For more than 3 founders, provide remaining stake under 'Other Founders'.",
      Placeholder: { P1: "Enter Name", P2: "Enter Role", P3: "Enter Stake %" },
    },
  },
  sectionBusinessModelQuestions: {
    Q1: {
      Question: "Identify whether your startup target Enterprises (B2B), Individuals (B2C), or both.",
      options: [
        "N/A",
        "Business To Consumer (B2C)",
        "Business To Business (B2B)",
        "Both B2B & B2C",
      ],
      Tooltip: "Accurately identifying your business model, enhances the predictability of your addressable clientele.",
    },
    Q2: {
      Question: "Identify your target clientele group(s) by income bracket.",
      options: [
        "N/A",
        "Low Income Clientele",
        "Middle Income Clientele",
        "High Income Clientele",
        "Low & Middle Income Clientele",
        "Middle & High Income Clientele",
        "All Income Clientele",
      ],
      Tooltip: "It is essential to choose the clientele mix that is best inclined to purchase or use your product.",
    },
    Q3: {
      Question: "Does your Start-up target selling to Individuals or Households ?",
      options: ["N/A", "Individual Citizens", "Households"],
      Tooltip: "Classify your clientele by consumption nature, either Households (families) or individuals, to represent addressable clientele volume.",
    },
    Q4: {
      Question: "Which age bracket(s) does your addressable clientele fit into ?",
      options: [
        "Less than 5 years",
        "5 to 10",
        "10 to 15",
        "15 to 20",
        "20 to 25",
        "25 to 30",
        "30 to 35",
        "35 to 40",
        "40 to 45",
        "45 to 50",
        "50 to 55",
        "55 to 60",
        "60 to 65",
        "65 to 70",
        "70 to 75",
        "75 Plus",
      ],
      Tooltip: "Select the age bracket(s), representing potential consumers for your product at establishment.",
    },
    Q5: {
      Question: "Which Governorate(s) do you plan to target over the upcoming 5-years ?",
      Tooltip: "Select the governorates you wish to gradually expand your product to, per year.",
    },
    Q6: {
      Question: "Select the medium (Channel) through which your clientele can purchase or use your product.",
      options: [
        "N/A",
        "Mobile Applications",
        "Mobile Applications & Online Channels",
        "Mobile Applications, Online, & Offline Channels",
      ],
      Tooltip: "Define target channels for which your target clientele can view, access, use or purchase your product.",
    },
    Q7: {
      Question: "Enter the percentage you wish to gradually reach from your total addressable clientele (traffic).",
      Tooltip: "Traffic is the unique potential consumers from your addressable clientele, for which you aspire to reach, engage, and promote your product, through marketing efforts.",
      Placeholder: { P1: "Enter %" },
    },
    Q8: {
      Question: "Enter the percentage you believe to gradually acquire/convert, from your traffic estimates (Client Acquisition).",
      Tooltip: "Acquisition is the process of converting traffic reached, into new customers. It grows gradually in correlation with marketing and brand awareness.",
      Placeholder: { P1: "Enter %" },
    },
    Q9: {
      Question: "What industry(s) does your startup consider as potential clientele ?",
      options: [
        "Agriculture (Crop, Animal Production and Related Services)",
        "Forestry and Logging",
        "Fishing and Aquaculture",
        "Mining and Quarrying",
        "Manufacturing of Food Products",
        "Manufacturing of Beverages",
        "Manufacturing of Tobacco Products",
        "Manufacturing of Textiles",
        "Manufacturing of Wearing Apparel",
        "Manufacturing of Leather and Related Products",
        "Manufacturing of Wood, Cork (Excl. Furniture), Straw and Plaiting Materials",
        "Manufacturing of Paper and Related Products",
        "Printing and Reproduction of Recorded Media",
        "Manufacturing of Coke and Refined Petroleum Products",
        "Manufacturing of Chemical Products",
        "Manufacturing of Pharmaceuticals, Medicinal Chemical and Botanical Products",
        "Manufacturing of Rubber and Plastics Products",
        "Manufacturing of Other Non-metallic Mineral Products",
        "Manufacturing of Basic Metals",
        "Manufacturing of Fabricated Metal Products (Excl. Machinery and Equipment)",
        "Manufacturing of Computer, Electronic and Optical Products",
        "Manufacturing of Electrical Equipment",
        "Manufacturing of Machinery and Equipment N.E.C.",
        "Manufacturing of Motor Vehicles, Trailers and Semi-trailers",
        "Manufacturing of Other Transport Equipment",
        "Manufacturing of Furniture",
        "Other Manufacturing",
        "Repair and Installation of Machinery and Equipment",
        "Electricity, Gas, Steam and Air Conditioning Supply",
        "Water Collection, Treatment, and Supply",
        "Sewage",
        "Construction of Buildings",
        "Civil Engineering",
        "Specialized Construction Activities",
        "Wholesales and Retail Trade of Automotive Products",
        "Wholesale Trade of Other Products (Excl. Automotive)",
        "Retail Trade of Other Products (Excl. Automotive)",
        "Land Transport and Transport Via Pipelines",
        "Water Transport",
        "Air Transport",
        "Warehousing and Support Activities for Transportation",
        "Postal and Courier Activities",
        "Accommodation Services",
        "Food and Beverage Service Activities",
        "Publishing Activities",
        "Motion Picture, Video, Television Production, Sound and Music Production",
        "Programming and Broadcasting Activities",
        "Telecommunications",
        "Computer Programming, Consultancy and Related Activities",
        "Information Service Activities",
        "Financial Service Activities (Excl. Insurance and Pension Funding)",
        "Insurance, Reinsurance, and Pension Funding (Excl. Compulsory Social Security)",
        "Activities Auxiliary to Financial Services and Insurance Activities",
        "Real Estate Activities",
        "Legal and Accounting Activities",
        "Management Consultancy",
        "Architectural and Engineering Activities",
        "Scientific Research and Development",
        "Advertising and Market Research",
        "Other Professional, Scientific and Technical Activities",
        "Veterinary Activities",
        "Rental and Leasing Activities",
        "Employment Activities",
        "Travel Agency, Tour Operator, Reservation Service and Related Activities",
        "Security and Investigation Activities",
        "Services to Buildings and Landscape Activities",
        "Office Administrative and Other Business Support Activities",
        "Education",
        "Human Health Activities",
        "Residential Care Activities",
        "Social Work Activities Without Accommodation",
        "Creative, Arts and Entertainment Activities",
        "Libraries, Archives, Museums and Other Cultural Activities",
        "Gambling and Betting Activities",
        "Sports Activities, Amusement and Recreation Activities",
        "Activities of Membership Activities (Clubs, Associations, Organizations)",
        "Repair of Computers, Personal and Household Goods",
        "Other Personal Service Activities",
      ],
      Tooltip: "Based on your selection, the number of companies operating within such industriesare identified.",
    },
    Q10: {
      Question: "Does your startup target selling to companies or employees within the selected industries ?",
      options: ["N/A", "Companies", "Employees"],
      Tooltip: "Classify whether companies, e.g. Payment Provider, or their employees, e.g. Payroll Lending, represent your end consumers, to identify your addressable clientele.",
    },
    Q11: {
      Question: "Enter the percentage you believe to gradually reach from your total addressable clientele (traffic).",
      options: ["N/A", "Companies", "Employees"],
      Tooltip: "Traffic is the unique potential consumers from your addressable clientele, for which you aspire to reach, engage, and promote your product, through marketing efforts.",
      Placeholder: { P1: "Enter %" },
    },
    Q12: {
      Question: "Enter the percentage you believe to gradually acquire/convert, from your traffic estimates (Client Acquisition).",
      Tooltip: "Acquisition is the process of converting traffic reached, into new customers. It grows gradually in correlation with marketing and brand awareness.",
      Placeholder: { P1: "Enter %" },
    },
    Q13: {
      Question: "How do you define your clientele adaptability and acceptance to your product ?",
      options: ["N/A", "Easy To Adapt", "Adapt Over Time", "Hard To Adapt"],
      Tooltip: "Adaptability is the ease of clients to use the technology your startup is introducing, or categorize your product among their needs.",
    },
  },
  sectionFinancialForecastQuestions: {
    Q1: {
      Question: "What is your startup revenue model ?",
      options: ["N/A", "Subscription Based", "Transactional"],
      Tooltip: "'Transactional' is client claiming ownership after paying product value (Cash or Instalments), whereas in 'Subscription' client usage for the product depends on recurring payments.",
    },
    Q2: {
      Question: "What is your expected average selling price in 2022 ?",
      Tooltip: "Define the expected average selling price per unit for either subscription or transactional based revenue models.",
      Placeholder: { P1: "Enter Amount in EGP" },
    },
    Q3: {
      Question: "What is your expected average gross profit margin (%) in 2022 ?",
      Tooltip: "'Gross Profit Margin' (%) is the residual after deducting 'Cost of Sales' from 'Sales Value'. 'Gross Profit' is calculated before deducting salaries, administrative and marketing expenses, e.g. commissions in e-commerce.",
      Placeholder: { P1: "Enter %" },
    },
    Q4: {
      Question: "How do you expect your average price per unit to progress over the upcoming 5-years ?",
      options: [
        "N/A",
        "Stable Prices - no growth in prices",
        "Grow at inflation",
        "Grow at a premium to inflation",
        "Grow at a Discount to inflation",
      ],
      Tooltip: "Choose one of the price growth indicators that best suit your perception on market positioning, competition, quality, and pricing power of your product.",
    },
    Q5: {
      Question: "How do you expect your average cost per unit to progress over the upcoming 5-years ?",
      options: [
        "N/A",
        "Stable Costs - no growth in costs",
        "Grow at inflation",
        "Grow at a premium to inflation",
        "Grow at a Discount to inflation",
      ],
      Tooltip: "Choose one of the cost growth indicators that best suit your perception on market positioning, competition, quality, and pricing power of your product.",
    },
    Q6: {
      Question: "How does your startup collect sales receipts ?",
      options: [
        "N/A",
        "Cash on Delivery",
        "Online Payment",
        "Online Payment & Cash on Delivery",
      ],
      Tooltip: "The option for 'Online payment & Cash on Delivery' reflects enabling both methods to collect sales proceeds, otherwise choose your method.",
    },
    Q7: {
      Question: "What is the average number of days it takes your startup to collect sales proceeds and pay suppliers ?",
      Tooltip: "Provide the average 'Collection Period' between completing a sale and receiving the payment in return. And the average 'Payable Period' for payment owed to suppliers.",
      Placeholder: { P1: "Enter Number of Days" },
    },
    Q8: {
      Question: "Enter the percentages relevant for the mix of media channels to promote your product.",
      Placeholder: { P1: "Enter %" },
      Tooltip: "Assign weights to media channel(s) you believe is relevant to the presence of your clientele, to accurately tailor your media plan. Weights can be 0% for channels not relevant to the presence of your clientele.",
    },
    Q9: {
      Question: "Provide an approximate number of promotional videos and static posts to be used in the marketing campaign.",
      Placeholder: { P1: "Vidoes", P2: "Posts" },
      Tooltip: "'Promotional Videos' is a recommended marketing method to promote the product experience to addressable clientele. 'Static Posts' are graphical designs focusing on specific feature(s).",
    },
    Q10: {
      Question: "Provide an approximate budget per promotional video and static post.",
      Placeholder: { P1: "Enter Amount in EGP" },
      Tooltip: "Promotional Videos and Static Posts costs may vary; it is essential to set an average budget per video and per post (in EGP) to estimate the full marketing budget.",
    },
    Q11: {
      Question: "Enter your estimated headcount structure by role, average salary, and average date of hiring during 2022.",
      Placeholder: { P1: "Enter Count", P2: "Enter Salary" },
      Tooltip: "For multiple hirings, use the average hiring date for all employees in such department during 2022, e.g. 1 hiring in February and 1 hiring April = Choose March 2022.",
    },
    Q12: {
      Question: "What is the expected Office/Working Space and Utilities Cost ?",
      Placeholder: { P1: "Enter Amount in EGP" },
      Tooltip: "Provide an estimate for your office rent and utility expenses, e.g. internet costs, electricity in 2022, to tailor the administrative and running costs budgeter.",
    },
    Q13: {
      Question: "What is your estimated budget for fixed assets in 2022 ?",
      Placeholder: { P1: "Enter Amount in EGP/ First Year" },
      Tooltip: "'Software Assets' refers to technology assets depreciable over multiple years, e.g. Software developed by third party. 'Average Price Per Computer' is the estimated average price for computers needed.",
    },
  },

  user: {
    user_id: null,
    username: '',
    email:'',
    business_plan_name: '',
    business_plan_id: null,
    is_new_business_plan: false,
    business_plan_is_purchased: false,
    access_token_expiration_date: null,
    refresh_token_expiration_date: null,
    is_authenticated: false,
  },
  sectionClientBrief: {
    A1: "",
    A2: "",
    A3: "",
    A4: "N/A",
    A5: "",
    A6: "",
    A7: "",
    A8: "",
    A9: "",
    A10: "",
    A11: "",
    A12: "",
    A13: "", // A13 to A19 are empty strings to correspond with back end schema validations
    A14: "",
    A15: "",
    A16: "",
    A17: "",
    A18: "",
    A19: "",
    A20: "",
  },
  sectionBusinessModel: {
    A21: "",
    A22: null,
    A23: null,
    A24: false,
    A25: false,
    A26: false,
    A27: false,
    A28: false,
    A29: false,
    A30: false,
    A31: false,
    A32: false,
    A33: false,
    A34: false,
    A35: false,
    A36: false,
    A37: false,
    A38: false,
    A39: false,
    A40: null,
    A41: false,
    A42: false,
    A43: false,
    A44: false,
    A45: false,
    A46: false,
    A47: false,
    A48: false,
    A49: false,
    A50: false,
    A51: false,
    A52: false,
    A53: false,
    A54: false,
    A55: false,
    A56: false,
    A57: false,
    A58: false,
    A59: false,
    A60: false,
    A61: false,
    A62: false,
    A63: false,
    A64: false,
    A65: false,
    A66: false,
    A67: false,
    A68: false,
    A69: false,
    A70: false,
    A71: false,
    A72: false,
    A73: false,
    A74: false,
    A75: false,
    A76: false,
    A77: false,
    A78: false,
    A79: false,
    A80: false,
    A81: false,
    A82: false,
    A83: false,
    A84: false,
    A85: false,
    A86: false,
    A87: false,
    A88: false,
    A89: false,
    A90: false,
    A91: false,
    A92: false,
    A93: false,
    A94: false,
    A95: false,
    A96: false,
    A97: false,
    A98: false,
    A99: false,
    A100: false,
    A101: false,
    A102: false,
    A103: false,
    A104: false,
    A105: false,
    A106: false,
    A107: false,
    A108: false,
    A109: false,
    A110: false,
    A111: false,
    A112: false,
    A113: false,
    A114: false,
    A115: false,
    A116: false,
    A117: false,
    A118: false,
    A119: false,
    A120: false,
    A121: false,
    A122: false,
    A123: false,
    A124: false,
    A125: false,
    A126: false,
    A127: false,
    A128: false,
    A129: false,
    A130: false,
    A131: false,
    A132: false,
    A133: false,
    A134: false,
    A135: false,
    A136: false,
    A137: false,
    A138: false,
    A139: false,
    A140: false,
    A141: false,
    A142: false,
    A143: false,
    A144: false,
    A145: false,
    A146: false,
    A147: false,
    A148: false,
    A149: false,
    A150: false,
    A151: false,
    A152: false,
    A153: false,
    A154: false,
    A155: false,
    A156: false,
    A157: false,
    A158: false,
    A159: false,
    A160: false,
    A161: false,
    A162: false,
    A163: false,
    A164: false,
    A165: false,
    A166: false,
    A167: false,
    A168: false,
    A169: false,
    A170: false,
    A171: false,
    A172: false,
    A173: false,
    A174: false,
    A175: false,
    A176: false,
    A177: false,
    A178: false,
    A179: false,
    A180: false,
    A181: "",
    A182: "",
    A183: "",
    A184: "",
    A185: "",
    A186: "",
    A187: "",
    A188: "",
    A189: "",
    A190: "",
    A191: false,
    A192: false,
    A193: false,
    A194: false,
    A195: false,
    A196: false,
    A197: false,
    A198: false,
    A199: false,
    A200: false,
    A201: false,
    A202: false,
    A203: false,
    A204: false,
    A205: false,
    A206: false,
    A207: false,
    A208: false,
    A209: false,
    A210: false,
    A211: false,
    A212: false,
    A213: false,
    A214: false,
    A215: false,
    A216: false,
    A217: false,
    A218: false,
    A219: false,
    A220: false,
    A221: false,
    A222: false,
    A223: false,
    A224: false,
    A225: false,
    A226: false,
    A227: false,
    A228: false,
    A229: false,
    A230: false,
    A231: false,
    A232: false,
    A233: false,
    A234: false,
    A235: false,
    A236: false,
    A237: false,
    A238: false,
    A239: false,
    A240: false,
    A241: false,
    A242: false,
    A243: false,
    A244: false,
    A245: false,
    A246: false,
    A247: false,
    A248: false,
    A249: false,
    A250: false,
    A251: false,
    A252: false,
    A253: false,
    A254: false,
    A255: false,
    A256: false,
    A257: false,
    A258: false,
    A259: false,
    A260: false,
    A261: false,
    A262: false,
    A263: false,
    A264: false,
    A265: false,
    A266: false,
    A267: false,
    A268: false,
    A269: null,
    A270: "",
    A271: "",
    A272: "",
    A273: "",
    A274: "",
    A275: "",
    A276: "",
    A277: "",
    A278: "",
    A279: "",
    A280: "",
  },
  sectionFinancialForecast: {
    A281: "",
    A282: "",
    A283: "",
    A284: "",
    A285: "",
    A286: "",
    A287: "",
    A288: "",
    A289: "",
    A290: "",
    A291: "",
    A292: "",
    A293: "",
    A294: "",
    A295: "",
    A296: "",
    A297: "",
    A298: "",
    A299: "",
    A300: "",
    A301: "",
    A302: "",
    A303: "",
    A304: "",
    A305: "",
    A306: "",
    A307: "",
    A308: "",
    A309: "",
    A310: "",
    A311: "",
    A312: "",
    A313: "",
    A314: "",
    A315: "",
    A316: "",
    A317: "",
    A318: "",
    A319: "",
    A320: "",
    A321: "",
    A322: "",
    A323: "",
    A324: "",
    A325: "",
    A326: "",
    A327: "",
    A328: "",
    A329: "",
    A330: "",
    A331: "",
    A332: "",
  },
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {

  const STORAGE_KEY = 'USER';

  const [state, dispatch] = useReducer(Reducer, initialState, (state) => {

    // getting items stored in localstorage to be persistedData

    const persistedData = localStorage.getItem(STORAGE_KEY);
    const user = persistedData ? JSON.parse(persistedData): state.user
    return {...state, user}
  });


  useEffect(() => {

    // saving to be persistedData in localstorage whenver a change happens to user

     localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
  },[state.user])

  

  useEffect(() => {
    window.addEventListener('storage', () => {
        const persistedData = localStorage.getItem(STORAGE_KEY)
        const newData = persistedData ? (JSON.parse(persistedData)) : null

        if (newData) {
            dispatch({ type: 'SYNC_REQUEST', payload: newData })
        }
    })
}, [])



  // Actions

  function updateMultipleGovernorates(answers, value) {
    dispatch({
      type: "UPDATE_MULTIPLE_GOVERNORATES",
      payload: {
        answers: answers,
        value: value,
      },
    });
  }

  function updateMultipleAges(answers, value) {
    dispatch({
      type: "UPDATE_MULTIPLE_AGES",
      payload: {
        answers: answers,
        value: value,
      },
    });
  }

  function editStep(step) {
    dispatch({
      type: "EDIT_STEP",
      payload: {
        step: step,
      },
    });
  }

  function userLogin(username, user_id,email,access_exp, refresh_exp) {
    dispatch({
      type: "USER_LOGIN",
      payload: {
        username: username,
        user_id: user_id,
        email: email,
        access_exp: access_exp,
        refresh_exp: refresh_exp,
      },
    });
  }

  function setBusinessPlanID(business_plan_id) {
    dispatch({
      type: "SET_BUSINESSPLAN_ID",
      payload: {business_plan_id: business_plan_id},
    })
  }

  function setBusinessPlanIsPurchased(purchase_truth_value) {
    dispatch({
      type: "SET_BUSINESSPLAN_IS_PURCHASED",
      payload: {purchase_truth_value: purchase_truth_value},
    })
  }

  function createNewBusinessPlan(bp_name) {
    dispatch({
      type: "CREATE_NEW_BUSINESS_PLAN",
      payload: {
        business_plan_name: bp_name,
        initialState: initialState
      },
    });
  }

  function createUnfinishedBusinessPlan(bp_name, bp_id) {
    dispatch({
      type: "CREATE_UNFINISHED_BUSINESS_PLAN",
      payload: {
        business_plan_name: bp_name,
        business_plan_id: bp_id,
      },
    });
  }

  function clearBusinessPlan() {
    dispatch({
      type: "CLEAR_BUSINESS_PLAN",
    });
  }

  function editUser(key,value) {
    dispatch({
      type: "EDIT_USER",
      payload: {
        key: key,
        value: value,
      },
    });
  }

  function userLogout() {
    dispatch({
      type: "USER_LOGOUT",
      payload: {
        initialState: initialState,
      },
    });
  }

  function editAnswerCB(key, answer) {
    dispatch({
      type: "EDIT_ANSWERCB",
      payload: {
        key: key,
        answer: answer,
      },
    });
  }

  function getClientBriefAnswers(answers) {
    dispatch({
      type: "GET_CLIENT_BRIEF_ANSWERS",
      payload: {
        answers: answers,
      },
    });
  }

  function getFinancialForecastAnswers(answers) {
    dispatch({
      type: "GET_FINANCIAL_FORECAST_ANSWERS",
      payload: {
        answers: answers,
      },
    });
  }

  function getBusinessModelAnswers(answers) {
    dispatch({
      type: "GET_BUSINESS_MODEL_ANSWERS",
      payload: {
        answers: answers,
      },
    });
  }

  function editAnswerBM(key, answer) {
    dispatch({
      type: "EDIT_ANSWERBM",
      payload: {
        key: key,
        answer: answer,
      },
    });
  }

  function editAnswerFF(key, answer) {
    dispatch({
      type: "EDIT_ANSWERFF",
      payload: {
        key: key,
        answer: answer,
      },
    });
  }

  const nextStep = () => {
    dispatch({ type: "INCREASE_STEP" });
  };

  const prevStep = () => {
    dispatch({ type: "DECREASE_STEP" });
  };

  return (
    <GlobalContext.Provider
      value={{
        sectionClientBriefQuestions: state.sectionClientBriefQuestions,
        sectionBusinessModelQuestions: state.sectionBusinessModelQuestions,
        sectionFinancialForecastQuestions: state.sectionFinancialForecastQuestions,
        user: state.user,
        sectionClientBrief: state.sectionClientBrief,
        sectionBusinessModel: state.sectionBusinessModel,
        sectionFinancialForecast: state.sectionFinancialForecast,
        step: state.step,
        initialState: state.initialState,
        nextStep,
        prevStep,
        editStep,
        editAnswerCB,
        getClientBriefAnswers,
        getBusinessModelAnswers,
        getFinancialForecastAnswers,
        editAnswerBM,
        editAnswerFF,
        userLogin,
        userLogout,
        editUser,
        createUnfinishedBusinessPlan,
        createNewBusinessPlan,
        clearBusinessPlan,
        updateMultipleGovernorates,
        updateMultipleAges,
        setBusinessPlanID,
        setBusinessPlanIsPurchased,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
