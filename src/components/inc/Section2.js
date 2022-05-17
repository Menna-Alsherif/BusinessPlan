import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import QuestionnaireContainer from "./QuestionnaireContainer";
import Question from "./Question";
import DropdownInputField from "./DropdownInputField";
import { WarningPopUpModal } from "./WarningPopUpModal";
import { RemoveWheelFunctionality } from "./RemoveWheelFunctionality";
import CheckBoxInputField from "./CheckBoxInputField";
import { Prompt } from "react-router-dom";
import HandleUserExit from "../HandleUserExit.js";
import Loader from "./Loader";
import useFetch from "use-http";
import FallbackUI from "./FallbackUI";
import NavigationButtons from "./NavigationButtons";
import InputFieldPercentage from "./InputFieldPercentage";
import { getDynamicYear, Years } from "./DynamicDates";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Section2({ nextStep, serverError }) {
  const {
    sectionBusinessModel,
    sectionBusinessModelQuestions,
    editAnswerBM,
    updateMultipleGovernorates,
    updateMultipleAges,
    user,
  } = useContext(GlobalContext);

  const [error_not_handled, setErrorNotHandled] = useState(false);

  const { post: getB2CTargetClientele, loading: b2c_target_clientele_loading } =
    useFetch(`/b2c_target_clientele`);

  const { post: getB2BTargetClientele, loading: b2b_target_clientele_loading } =
    useFetch(`/b2b_target_clientele`);

  const {
    post: saveBusinessModelAnswers,
    loading: save_business_model_answers_loading,
  } = useFetch(`/business_model_answer_view`);

  const {
    First: first_year,
    Second: second_year,
    Third: third_year,
    Fourth: fourth_year,
    Fifth: fifth_year,
  } = Years;

  RemoveWheelFunctionality();

  const {
    A21,
    A22,
    A23,
    A24,
    A25,
    A26,
    A27,
    A28,
    A29,
    A30,
    A31,
    A32,
    A33,
    A34,
    A35,
    A36,
    A37,
    A38,
    A39,
    A40,
    A41,
    A42,
    A43,
    A44,
    A45,
    A46,
    A47,
    A48,
    A49,
    A50,
    A51,
    A52,
    A53,
    A54,
    A55,
    A56,
    A57,
    A58,
    A59,
    A60,
    A61,
    A62,
    A63,
    A64,
    A65,
    A66,
    A67,
    A68,
    A69,
    A70,
    A71,
    A72,
    A73,
    A74,
    A75,
    A76,
    A77,
    A78,
    A79,
    A80,
    A81,
    A82,
    A83,
    A84,
    A85,
    A86,
    A87,
    A88,
    A89,
    A90,
    A91,
    A92,
    A93,
    A94,
    A95,
    A96,
    A97,
    A98,
    A99,
    A100,
    A101,
    A102,
    A103,
    A104,
    A105,
    A106,
    A107,
    A108,
    A109,
    A110,
    A111,
    A112,
    A113,
    A114,
    A115,
    A116,
    A117,
    A118,
    A119,
    A120,
    A121,
    A122,
    A123,
    A124,
    A125,
    A126,
    A127,
    A128,
    A129,
    A130,
    A131,
    A132,
    A133,
    A134,
    A135,
    A136,
    A137,
    A138,
    A139,
    A140,
    A141,
    A142,
    A143,
    A144,
    A145,
    A146,
    A147,
    A148,
    A149,
    A150,
    A151,
    A152,
    A153,
    A154,
    A155,
    A156,
    A157,
    A158,
    A159,
    A160,
    A161,
    A162,
    A163,
    A164,
    A165,
    A166,
    A167,
    A168,
    A169,
    A170,
    A171,
    A172,
    A173,
    A174,
    A175,
    A176,
    A177,
    A178,
    A179,
    A180,
    A181,
    A182,
    A183,
    A184,
    A185,
    A186,
    A187,
    A188,
    A189,
    A190,
    A191,
    A192,
    A193,
    A194,
    A195,
    A196,
    A197,
    A198,
    A199,
    A200,
    A201,
    A202,
    A203,
    A204,
    A205,
    A206,
    A207,
    A208,
    A209,
    A210,
    A211,
    A212,
    A213,
    A214,
    A215,
    A216,
    A217,
    A218,
    A219,
    A220,
    A221,
    A222,
    A223,
    A224,
    A225,
    A226,
    A227,
    A228,
    A229,
    A230,
    A231,
    A232,
    A233,
    A234,
    A235,
    A236,
    A237,
    A238,
    A239,
    A240,
    A241,
    A242,
    A243,
    A244,
    A245,
    A246,
    A247,
    A248,
    A249,
    A250,
    A251,
    A252,
    A253,
    A254,
    A255,
    A256,
    A257,
    A258,
    A259,
    A260,
    A261,
    A262,
    A263,
    A264,
    A265,
    A266,
    A267,
    A268,
    A269,
    A270,
    A271,
    A272,
    A273,
    A274,
    A275,
    A276,
    A277,
    A278,
    A279,
    A280,
  } = sectionBusinessModel;

  const { Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13 } =
    sectionBusinessModelQuestions;

  useEffect(() => {
    if (
      A40 &&
      A22 &&
      A23 &&
      A40 &&
      (A24 ||
        A25 ||
        A26 ||
        A27 ||
        A28 ||
        A29 ||
        A30 ||
        A31 ||
        A32 ||
        A33 ||
        A34 ||
        A35 ||
        A36 ||
        A37 ||
        A38 ||
        (A39 &&
          (A41 ||
            A42 ||
            A43 ||
            A44 ||
            A45 ||
            A46 ||
            A47 ||
            A48 ||
            A49 ||
            A50 ||
            A51 ||
            A52 ||
            A53 ||
            A54 ||
            A55 ||
            A56 ||
            A57 ||
            A58 ||
            A59 ||
            A60 ||
            A61 ||
            A62 ||
            A63 ||
            A64 ||
            A65 ||
            A66 ||
            A67 ||
            A68 ||
            A69 ||
            A70 ||
            A71 ||
            A72 ||
            A73 ||
            A74 ||
            A75 ||
            A76 ||
            A77 ||
            A78 ||
            A79 ||
            A80 ||
            A81 ||
            A82 ||
            A83 ||
            A84 ||
            A85 ||
            A86 ||
            A87 ||
            A88 ||
            A89 ||
            A90 ||
            A91 ||
            A92 ||
            A93 ||
            A94 ||
            A95 ||
            A96 ||
            A97 ||
            A98 ||
            A99 ||
            A100 ||
            A101 ||
            A102 ||
            A103 ||
            A104 ||
            A105 ||
            A106 ||
            A107 ||
            A108 ||
            A109 ||
            A110 ||
            A111 ||
            A112 ||
            A113 ||
            A114 ||
            A115 ||
            A116 ||
            A117 ||
            A118 ||
            A119 ||
            A120 ||
            A121 ||
            A122 ||
            A123 ||
            A124 ||
            A125 ||
            A126 ||
            A127 ||
            A128 ||
            A129 ||
            A130 ||
            A131 ||
            A132 ||
            A133 ||
            A134 ||
            A135 ||
            A136 ||
            A137 ||
            A138 ||
            A139 ||
            A140 ||
            A141 ||
            A142 ||
            A143 ||
            A144 ||
            A145 ||
            A146 ||
            A147 ||
            A148 ||
            A149 ||
            A150 ||
            A151 ||
            A152 ||
            A153 ||
            A154 ||
            A155 ||
            A156 ||
            A157 ||
            A158 ||
            A159 ||
            A160 ||
            A161 ||
            A162 ||
            A163 ||
            A164 ||
            A165 ||
            A166 ||
            A167 ||
            A168 ||
            A169 ||
            A170 ||
            A171 ||
            A172 ||
            A173 ||
            A174 ||
            A175 ||
            A176 ||
            A177 ||
            A178 ||
            A179 ||
            A180)))
    ) {
      B2cTargetClientele();
    }
  }, []);

  useEffect(() => {
    if (
      A269 &&
      (A191 ||
        A192 ||
        A193 ||
        A194 ||
        A195 ||
        A196 ||
        A197 ||
        A198 ||
        A199 ||
        A200 ||
        A201 ||
        A202 ||
        A203 ||
        A204 ||
        A205 ||
        A206 ||
        A207 ||
        A208 ||
        A209 ||
        A210 ||
        A211 ||
        A212 ||
        A213 ||
        A214 ||
        A215 ||
        A216 ||
        A217 ||
        A218 ||
        A219 ||
        A220 ||
        A221 ||
        A222 ||
        A223 ||
        A224 ||
        A225 ||
        A226 ||
        A227 ||
        A228 ||
        A229 ||
        A230 ||
        A231 ||
        A232 ||
        A233 ||
        A234 ||
        A235 ||
        A236 ||
        A237 ||
        A238 ||
        A239 ||
        A240 ||
        A241 ||
        A242 ||
        A243 ||
        A244 ||
        A245 ||
        A246 ||
        A247 ||
        A248 ||
        A249 ||
        A250 ||
        A251 ||
        A252 ||
        A253 ||
        A254 ||
        A255 ||
        A256 ||
        A257 ||
        A258 ||
        A259 ||
        A260 ||
        A261 ||
        A262 ||
        A263 ||
        A264 ||
        A265 ||
        A266 ||
        A267 ||
        A268)
    ) {
      B2bTargetClientele();
    }
  }, []);

  //function that takes a certain year and gets all the Answers of all governorates in that year

  function getAllGovernoratesAnswersOfYear(year) {
    let governorate_answers_array = [];
    Object.entries(governorate_answers).map(([governorate, answers]) => {
      return (governorate_answers_array = [
        answers[year],
        ...governorate_answers_array,
      ]);
    });
    return governorate_answers_array;
  }

  //function that takes governorate and gets all answers for that governorate in all 5 years

  function getOneGovernorateAnswersofAllYears(governorate) {
    let governorate_answers_all_years_array = [
      ...governorate_answers[governorate],
    ];
    return governorate_answers_all_years_array;
  }

  // function that get all governorates' answers in all years
  function getAllGovernoratesAnswersAllYears() {
    let all_governorate_answers_all_years_array = [];
    Object.entries(governorate_answers).map(([governorate, answers]) => {
      return answers.map((answer) => {
        return all_governorate_answers_all_years_array.push(answer);
      });
    });
    return all_governorate_answers_all_years_array;
  }

  const [b2c_tc1, setb2c_tc1] = useState(0);
  const [b2c_tc2, setb2c_tc2] = useState(0);
  const [b2c_tc3, setb2c_tc3] = useState(0);
  const [b2c_tc4, setb2c_tc4] = useState(0);
  const [b2c_tc5, setb2c_tc5] = useState(0);

  const [b2b_tc1, setb2b_tc1] = useState(0);
  const [b2b_tc2, setb2b_tc2] = useState(0);
  const [b2b_tc3, setb2b_tc3] = useState(0);
  const [b2b_tc4, setb2b_tc4] = useState(0);
  const [b2b_tc5, setb2b_tc5] = useState(0);

  // Calculate Potential Traffic after retreiving Target Clientele
  // ~~ To remove decimel points
  let b2c_pt1 = ~~((b2c_tc1 * A181) / 100);
  let b2c_pt2 = ~~((b2c_tc2 * A182) / 100);
  let b2c_pt3 = ~~((b2c_tc3 * A183) / 100);
  let b2c_pt4 = ~~((b2c_tc4 * A184) / 100);
  let b2c_pt5 = ~~((b2c_tc5 * A185) / 100);

  let b2b_pt1 = ~~((b2b_tc1 * A270) / 100);
  let b2b_pt2 = ~~((b2b_tc2 * A271) / 100);
  let b2b_pt3 = ~~((b2b_tc3 * A272) / 100);
  let b2b_pt4 = ~~((b2b_tc4 * A273) / 100);
  let b2b_pt5 = ~~((b2b_tc5 * A274) / 100);

  function deRequireCb(elClass) {
    let el = document.getElementsByClassName(elClass);
    let i;

    let atLeastOneChecked = false; //at least one cb is checked
    for (i = 0; i < el.length; i++) {
      if (el[i].checked === true) {
        atLeastOneChecked = true;
      }
    }

    if (atLeastOneChecked === true) {
      for (i = 0; i < el.length; i++) {
        el[i].required = false;
      }
    } else {
      for (i = 0; i < el.length; i++) {
        el[i].required = true;
      }
    }
  }

  const B2cTargetClientele = async () => {
    const params = {
      income_clientele: A22,
      individuals_households: A23,
      age_bracket: {
        "Less than 5 years": A24,
        "5 to 10": A25,
        "10 to 15": A26,
        "15 to 20": A27,
        "20 to 25": A28,
        "25 to 30": A29,
        "30 to 35": A30,
        "35 to 40": A31,
        "40 to 45": A32,
        "45 to 50": A33,
        "50 to 55": A34,
        "55 to 60": A35,
        "60 to 65": A36,
        "65 to 70": A37,
        "70 to 75": A38,
        "75 plus": A39,
      },
      internet_accessability: A40,
      governorates: {
        [first_year]: {
          Cairo: A41,
          Alexandria: A46,
          "Port-Said": A51,
          Suez: A56,
          Damietta: A61,
          Dakahlia: A66,
          Sharkia: A71,
          Kalyoubia: A76,
          "Kafr El Sheikh": A81,
          Gharbia: A86,
          Menoufia: A91,
          Behera: A96,
          Ismailia: A101,
          Giza: A106,
          "Beni-suef": A111,
          Fayoum: A116,
          Menia: A121,
          Asyout: A126,
          Suhag: A131,
          Qena: A136,
          Aswan: A141,
          Luxor: A146,
          "Red Sea": A151,
          "El Wadi El Gedid": A156,
          Matrouh: A161,
          "North Sinai": A166,
          "South Sinai": A171,
        },
        [second_year]: {
          Cairo: A42,
          Alexandria: A47,
          "Port-Said": A52,
          Suez: A57,
          Damietta: A62,
          Dakahlia: A67,
          Sharkia: A72,
          Kalyoubia: A77,
          "Kafr El Sheikh": A82,
          Gharbia: A87,
          Menoufia: A92,
          Behera: A97,
          Ismailia: A102,
          Giza: A107,
          "Beni-suef": A112,
          Fayoum: A117,
          Menia: A122,
          Asyout: A127,
          Suhag: A132,
          Qena: A137,
          Aswan: A142,
          Luxor: A147,
          "Red Sea": A152,
          "El Wadi El Gedid": A157,
          Matrouh: A162,
          "North Sinai": A167,
          "South Sinai": A172,
        },
        [third_year]: {
          Cairo: A43,
          Alexandria: A48,
          "Port-Said": A53,
          Suez: A58,
          Damietta: A63,
          Dakahlia: A68,
          Sharkia: A73,
          Kalyoubia: A78,
          "Kafr El Sheikh": A83,
          Gharbia: A88,
          Menoufia: A93,
          Behera: A98,
          Ismailia: A103,
          Giza: A108,
          "Beni-suef": A113,
          Fayoum: A118,
          Menia: A123,
          Asyout: A128,
          Suhag: A133,
          Qena: A138,
          Aswan: A143,
          Luxor: A148,
          "Red Sea": A153,
          "El Wadi El Gedid": A158,
          Matrouh: A163,
          "North Sinai": A168,
          "South Sinai": A173,
        },
        [fourth_year]: {
          Cairo: A44,
          Alexandria: A49,
          "Port-Said": A54,
          Suez: A59,
          Damietta: A64,
          Dakahlia: A69,
          Sharkia: A74,
          Kalyoubia: A79,
          "Kafr El Sheikh": A84,
          Gharbia: A89,
          Menoufia: A94,
          Behera: A99,
          Ismailia: A104,
          Giza: A109,
          "Beni-suef": A114,
          Fayoum: A119,
          Menia: A124,
          Asyout: A129,
          Suhag: A134,
          Qena: A139,
          Aswan: A144,
          Luxor: A149,
          "Red Sea": A154,
          "El Wadi El Gedid": A159,
          Matrouh: A164,
          "North Sinai": A169,
          "South Sinai": A174,
        },
        [fifth_year]: {
          Cairo: A45,
          Alexandria: A50,
          "Port-Said": A55,
          Suez: A60,
          Damietta: A65,
          Dakahlia: A70,
          Sharkia: A75,
          Kalyoubia: A80,
          "Kafr El Sheikh": A85,
          Gharbia: A90,
          Menoufia: A95,
          Behera: A100,
          Ismailia: A105,
          Giza: A110,
          "Beni-suef": A115,
          Fayoum: A120,
          Menia: A125,
          Asyout: A130,
          Suhag: A135,
          Qena: A140,
          Aswan: A145,
          Luxor: A150,
          "Red Sea": A155,
          "El Wadi El Gedid": A160,
          Matrouh: A165,
          "North Sinai": A170,
          "South Sinai": A175,
        },
      },
    };

    let is_age_bracket = false;
    let is_governorates = {
      [first_year]: false,
      [second_year]: false,
      [third_year]: false,
      [fourth_year]: false,
      [fifth_year]: false,
    };

    // Check if user checked atleast 1 year bracket
    Object.values(params.age_bracket).forEach((age) => {
      if (age) {
        is_age_bracket = true;
      }
    });
    // Check is user checked atleast 1 governorate each year
    Object.keys(params.governorates).forEach((year) => {
      Object.values(params.governorates[year]).forEach((governorate) => {
        if (governorate) {
          is_governorates[year] = true;
        }
      });
    });

    if (!params.income_clientele) {
      WarningPopUpModal("Please Answer Income Clientele Question");
      return;
    } else if (!params.individuals_households) {
      WarningPopUpModal("Please Answer Individuals or Households Question");
      return;
    } else if (!params.internet_accessability) {
      WarningPopUpModal("Please Answer Internet Accessability Question");
      return;
    } else if (!is_age_bracket) {
      WarningPopUpModal("Please Answer Age Bracket Question");
      return;
    }

    // Return if a year with no selected governorates is detected
    let should_skip = false;
    Object.keys(is_governorates).forEach((year) => {
      if (should_skip) {
        return;
      }
      if (!is_governorates[year]) {
        WarningPopUpModal(
          `Please choose atleast 1 Governorate to target in ${year}`
        );
        should_skip = true;
        return;
      }
    });
    if (should_skip) return;

    //Api call to get calculated b2c_target_clientele_data

    const b2c_target_clientele_data = await getB2CTargetClientele(params);
    if (!b2c_target_clientele_data) {
      setErrorNotHandled(true);
    } else {
      setb2c_tc1(b2c_target_clientele_data["2022"]);
      setb2c_tc2(b2c_target_clientele_data["2023"]);
      setb2c_tc3(b2c_target_clientele_data["2024"]);
      setb2c_tc4(b2c_target_clientele_data["2025"]);
      setb2c_tc5(b2c_target_clientele_data["2026"]);
    }
  };

  const B2bTargetClientele = async () => {
    const params = {
      sector_employee: A269,
      industries: {
        "Agriculture (Crop, Animal Production and Related Services)": A191,
        "Forestry and Logging": A192,
        "Fishing and Aquaculture": A193,
        "Mining and Quarrying": A194,
        "Manufacturing of Food Products": A195,
        "Manufacturing of Beverages": A196,
        "Manufacturing of Tobacco Products": A197,
        "Manufacturing of Textiles": A198,
        "Manufacturing of Wearing Apparel": A199,
        "Manufacturing of Leather and Related Products": A200,
        "Manufacturing of Wood, Cork (Excl. Furniture), Straw and Plaiting Materials":
          A201,
        "Manufacturing of Paper and Related Products": A202,
        "Printing and Reproduction of Recorded Media": A203,
        "Manufacturing of Coke and Refined Petroleum Products": A204,
        "Manufacturing of Chemical Products": A205,
        "Manufacturing of Pharmaceuticals, Medicinal Chemical and Botanical Products":
          A206,
        "Manufacturing of Rubber and Plastics Products": A207,
        "Manufacturing of Other Non-metallic Mineral Products": A208,
        "Manufacturing of Basic Metals": A209,
        "Manufacturing of Fabricated Metal Products (Excl. Machinery and Equipment)":
          A210,
        "Manufacturing of Computer, Electronic and Optical Products": A211,
        "Manufacturing of Electrical Equipment": A212,
        "Manufacturing of Machinery and Equipment N.E.C.": A213,
        "Manufacturing of Motor Vehicles, Trailers and Semi-trailers": A214,
        "Manufacturing of Other Transport Equipment": A215,
        "Manufacturing of Furniture": A216,
        "Other Manufacturing": A217,
        "Repair and Installation of Machinery and Equipment": A218,
        "Electricity, Gas, Steam and Air Conditioning Supply": A219,
        "Water Collection, Treatment, and Supply": A220,
        Sewage: A221,
        "Construction of Buildings": A222,
        "Civil Engineering": A223,
        "Specialized Construction Activities": A224,
        "Wholesales and Retail Trade of Automotive Products": A225,
        "Wholesale Trade of Other Products (Excl. Automotive)": A226,
        "Retail Trade of Other Products (Excl. Automotive)": A227,
        "Land Transport and Transport Via Pipelines": A228,
        "Water Transport": A229,
        "Air Transport": A230,
        "Warehousing and Support Activities for Transportation": A231,
        "Postal and Courier Activities": A232,
        "Accommodation Services": A233,
        "Food and Beverage Service Activities": A234,
        "Publishing Activities": A235,
        "Motion Picture, Video, Television Production, Sound and Music Production":
          A236,
        "Programming and Broadcasting Activities": A237,
        Telecommunications: A238,
        "Computer Programming, Consultancy and Related Activities": A239,
        "Information Service Activities": A240,
        "Financial Service Activities (Excl. Insurance and Pension Funding)":
          A241,
        "Insurance, Reinsurance, and Pension Funding (Excl. Compulsory Social Security)":
          A242,
        "Activities Auxiliary to Financial Services and Insurance Activities":
          A243,
        "Real Estate Activities": A244,
        "Legal and Accounting Activities": A245,
        "Management Consultancy": A246,
        "Architectural and Engineering Activities": A247,
        "Scientific Research and Development": A248,
        "Advertising and Market Research": A249,
        "Other Professional, Scientific and Technical Activities": A250,
        "Veterinary Activities": A251,
        "Rental and Leasing Activities": A252,
        "Employment Activities": A253,
        "Travel Agency, Tour Operator, Reservation Service and Related Activities":
          A254,
        "Security and Investigation Activities": A255,
        "Services to Buildings and Landscape Activities": A256,
        "Office Administrative and Other Business Support Activities": A257,
        Education: A258,
        "Human Health Activities": A259,
        "Residential Care Activities": A260,
        "Social Work Activities Without Accommodation": A261,
        "Creative, Arts and Entertainment Activities": A262,
        "Libraries, Archives, Museums and Other Cultural Activities": A263,
        "Gambling and Betting Activities": A264,
        "Sports Activities, Amusement and Recreation Activities": A265,
        "Activities of Membership Activities (Clubs, Associations, Organizations)":
          A266,
        "Repair of Computers, Personal and Household Goods": A267,
        "Other Personal Service Activities": A268,
      },
    };

    let is_industries = false;

    // Check if user atleast selected 1 industry
    Object.values(params.industries).forEach((industry) => {
      if (industry) {
        is_industries = true;
      }
    });

    if (!is_industries) {
      WarningPopUpModal(
        "Please Choose Atleast 1 Industy To conduct business with"
      );
      return;
    } else if (!params.sector_employee) {
      WarningPopUpModal("Please Answer Companies Or Employees Question");
      return;
    }

    //Api call to get calculated b2b_target_clientele_data

    const b2b_target_clientele_data = await getB2BTargetClientele(params);
    if (!b2b_target_clientele_data) {
      setErrorNotHandled(true);
    }
    if (b2b_target_clientele_data) {
      setb2b_tc1(b2b_target_clientele_data["2022"]);
      setb2b_tc2(b2b_target_clientele_data["2023"]);
      setb2b_tc3(b2b_target_clientele_data["2024"]);
      setb2b_tc4(b2b_target_clientele_data["2025"]);
      setb2b_tc5(b2b_target_clientele_data["2026"]);
    }
  };

  const age_brackets_answers = [
    "A24",
    "A25",
    "A26",
    "A27",
    "A28",
    "A29",
    "A30",
    "A31",
    "A32",
    "A33",
    "A34",
    "A35",
    "A36",
    "A37",
    "A38",
    "A39",
  ];

  //191 , 268

  const industry_answers = [
    "A191",
    "A192",
    "A193",
    "A194",
    "A195",
    "A196",
    "A197",
    "A198",
    "A199",
    "A200",
    "A201",
    "A202",
    "A203",
    "A204",
    "A205",
    "A206",
    "A207",
    "A208",
    "A209",
    "A210",
    "A211",
    "A212",
    "A213",
    "A214",
    "A215",
    "A216",
    "A217",
    "A218",
    "A219",
    "A220",
    "A221",
    "A222",
    "A223",
    "A224",
    "A225",
    "A226",
    "A227",
    "A228",
    "A229",
    "A230",
    "A231",
    "A232",
    "A233",
    "A234",
    "A235",
    "A236",
    "A237",
    "A238",
    "A239",
    "A240",
    "A241",
    "A242",
    "A243",
    "A244",
    "A245",
    "A246",
    "A247",
    "A248",
    "A249",
    "A250",
    "A251",
    "A252",
    "A253",
    "A254",
    "A255",
    "A256",
    "A257",
    "A258",
    "A259",
    "A260",
    "A261",
    "A262",
    "A263",
    "A264",
    "A265",
    "A266",
    "A267",
    "A268",
  ];

  const governorate_answers = {
    "All Governorates": ["A176", "A177", "A178", "A179", "A180"],
    Cairo: ["A41", "A42", "A43", "A44", "A45"],
    Alexandria: ["A46", "A47", "A48", "A49", "A50"],
    "Port-Said": ["A51", "A52", "A53", "A54", "A55"],
    Suez: ["A56", "A57", "A58", "A59", "A60"],
    Damietta: ["A61", "A62", "A63", "A64", "A65"],
    Dakahlia: ["A66", "A67", "A68", "A69", "A70"],
    Sharkia: ["A71", "A72", "A73", "A74", "A75"],
    Kalyoubia: ["A76", "A77", "A78", "A79", "A80"],
    "Kafr El Sheikh": ["A81", "A82", "A83", "A84", "A85"],
    Gharbia: ["A86", "A87", "A88", "A89", "A90"],
    Menoufia: ["A91", "A92", "A93", "A94", "A95"],
    Behera: ["A96", "A97", "A98", "A99", "A100"],
    Ismailia: ["A101", "A102", "A103", "A104", "A105"],
    Giza: ["A106", "A107", "A108", "A109", "A110"],
    "Beni-suef": ["A111", "A112", "A113", "A114", "A115"],
    Fayoum: ["A116", "A117", "A118", "A119", "A120"],
    Menia: ["A121", "A122", "A123", "A124", "A125"],
    Asyout: ["A126", "A127", "A128", "A129", "A130"],
    Suhag: ["A131", "A132", "A133", "A134", "A135"],
    Qena: ["A136", "A137", "A138", "A139", "A140"],
    Aswan: ["A141", "A142", "A143", "A144", "A145"],
    Luxor: ["A146", "A147", "A148", "A149", "A150"],
    "Red Sea": ["A151", "A152", "A153", "A154", "A155"],
    "El Wadi El Gedid": ["A156", "A157", "A158", "A159", "A160"],
    Matrouh: ["A161", "A162", "A163", "A164", "A165"],
    "North Sinai": ["A166", "A167", "A168", "A169", "A170"],
    "South Sinai": ["A171", "A172", "A173", "A174", "A175"],
  };

  const businesModelAnswersAPI = async () => {
    const answers = {
      business_model: A21,
      income_clientele: A22,
      individuals_households: A23,
      age_bracket: {
        "Less than 5 years": A24,
        "5 to 10": A25,
        "10 to 15": A26,
        "15 to 20": A27,
        "20 to 25": A28,
        "25 to 30": A29,
        "30 to 35": A30,
        "35 to 40": A31,
        "40 to 45": A32,
        "45 to 50": A33,
        "50 to 55": A34,
        "55 to 60": A35,
        "60 to 65": A36,
        "65 to 70": A37,
        "70 to 75": A38,
        "75 plus": A39,
      },
      internet_accessability: A40,
      governorates: {
        [first_year]: {
          Cairo: A41,
          Alexandria: A46,
          "Port-Said": A51,
          Suez: A56,
          Damietta: A61,
          Dakahlia: A66,
          Sharkia: A71,
          Kalyoubia: A76,
          "Kafr El Sheikh": A81,
          Gharbia: A86,
          Menoufia: A91,
          Behera: A96,
          Ismailia: A101,
          Giza: A106,
          "Beni-suef": A111,
          Fayoum: A116,
          Menia: A121,
          Asyout: A126,
          Suhag: A131,
          Qena: A136,
          Aswan: A141,
          Luxor: A146,
          "Red Sea": A151,
          "El Wadi El Gedid": A156,
          Matrouh: A161,
          "North Sinai": A166,
          "South Sinai": A171,
        },
        [second_year]: {
          Cairo: A42,
          Alexandria: A47,
          "Port-Said": A52,
          Suez: A57,
          Damietta: A62,
          Dakahlia: A67,
          Sharkia: A72,
          Kalyoubia: A77,
          "Kafr El Sheikh": A82,
          Gharbia: A87,
          Menoufia: A92,
          Behera: A97,
          Ismailia: A102,
          Giza: A107,
          "Beni-suef": A112,
          Fayoum: A117,
          Menia: A122,
          Asyout: A127,
          Suhag: A132,
          Qena: A137,
          Aswan: A142,
          Luxor: A147,
          "Red Sea": A152,
          "El Wadi El Gedid": A157,
          Matrouh: A162,
          "North Sinai": A167,
          "South Sinai": A172,
        },
        [third_year]: {
          Cairo: A43,
          Alexandria: A48,
          "Port-Said": A53,
          Suez: A58,
          Damietta: A63,
          Dakahlia: A68,
          Sharkia: A73,
          Kalyoubia: A78,
          "Kafr El Sheikh": A83,
          Gharbia: A88,
          Menoufia: A93,
          Behera: A98,
          Ismailia: A103,
          Giza: A108,
          "Beni-suef": A113,
          Fayoum: A118,
          Menia: A123,
          Asyout: A128,
          Suhag: A133,
          Qena: A138,
          Aswan: A143,
          Luxor: A148,
          "Red Sea": A153,
          "El Wadi El Gedid": A158,
          Matrouh: A163,
          "North Sinai": A168,
          "South Sinai": A173,
        },
        [fourth_year]: {
          Cairo: A44,
          Alexandria: A49,
          "Port-Said": A54,
          Suez: A59,
          Damietta: A64,
          Dakahlia: A69,
          Sharkia: A74,
          Kalyoubia: A79,
          "Kafr El Sheikh": A84,
          Gharbia: A89,
          Menoufia: A94,
          Behera: A99,
          Ismailia: A104,
          Giza: A109,
          "Beni-suef": A114,
          Fayoum: A119,
          Menia: A124,
          Asyout: A129,
          Suhag: A134,
          Qena: A139,
          Aswan: A144,
          Luxor: A149,
          "Red Sea": A154,
          "El Wadi El Gedid": A159,
          Matrouh: A164,
          "North Sinai": A169,
          "South Sinai": A174,
        },
        [fifth_year]: {
          Cairo: A45,
          Alexandria: A50,
          "Port-Said": A55,
          Suez: A60,
          Damietta: A65,
          Dakahlia: A70,
          Sharkia: A75,
          Kalyoubia: A80,
          "Kafr El Sheikh": A85,
          Gharbia: A90,
          Menoufia: A95,
          Behera: A100,
          Ismailia: A105,
          Giza: A110,
          "Beni-suef": A115,
          Fayoum: A120,
          Menia: A125,
          Asyout: A130,
          Suhag: A135,
          Qena: A140,
          Aswan: A145,
          Luxor: A150,
          "Red Sea": A155,
          "El Wadi El Gedid": A160,
          Matrouh: A165,
          "North Sinai": A170,
          "South Sinai": A175,
        },
      },
      b2c_traffic: {
        //checking empty string values to be sent to backend as zeros to conform with backend validation schema
        [first_year]: A181 === "" ? 0 : A181,
        [second_year]: A182 === "" ? 0 : A182,
        [third_year]: A183 === "" ? 0 : A183,
        [fourth_year]: A184 === "" ? 0 : A184,
        [fifth_year]: A185 === "" ? 0 : A185,
      },
      b2c_execution: {
        [first_year]: A186 === "" ? 0 : A186,
        [second_year]: A187 === "" ? 0 : A187,
        [third_year]: A188 === "" ? 0 : A188,
        [fourth_year]: A189 === "" ? 0 : A189,
        [fifth_year]: A190 === "" ? 0 : A190,
      },
      industries: {
        "Agriculture (Crop, Animal Production and Related Services)": A191,
        "Forestry and Logging": A192,
        "Fishing and Aquaculture": A193,
        "Mining and Quarrying": A194,
        "Manufacturing of Food Products": A195,
        "Manufacturing of Beverages": A196,
        "Manufacturing of Tobacco Products": A197,
        "Manufacturing of Textiles": A198,
        "Manufacturing of Wearing Apparel": A199,
        "Manufacturing of Leather and Related Products": A200,
        "Manufacturing of Wood, Cork (Excl. Furniture), Straw and Plaiting Materials":
          A201,
        "Manufacturing of Paper and Related Products": A202,
        "Printing and Reproduction of Recorded Media": A203,
        "Manufacturing of Coke and Refined Petroleum Products": A204,
        "Manufacturing of Chemical Products": A205,
        "Manufacturing of Pharmaceuticals, Medicinal Chemical and Botanical Products":
          A206,
        "Manufacturing of Rubber and Plastics Products": A207,
        "Manufacturing of Other Non-metallic Mineral Products": A208,
        "Manufacturing of Basic Metals": A209,
        "Manufacturing of Fabricated Metal Products (Excl. Machinery and Equipment)":
          A210,
        "Manufacturing of Computer, Electronic and Optical Products": A211,
        "Manufacturing of Electrical Equipment": A212,
        "Manufacturing of Machinery and Equipment N.E.C.": A213,
        "Manufacturing of Motor Vehicles, Trailers and Semi-trailers": A214,
        "Manufacturing of Other Transport Equipment": A215,
        "Manufacturing of Furniture": A216,
        "Other Manufacturing": A217,
        "Repair and Installation of Machinery and Equipment": A218,
        "Electricity, Gas, Steam and Air Conditioning Supply": A219,
        "Water Collection, Treatment, and Supply": A220,
        Sewage: A221,
        "Construction of Buildings": A222,
        "Civil Engineering": A223,
        "Specialized Construction Activities": A224,
        "Wholesales and Retail Trade of Automotive Products": A225,
        "Wholesale Trade of Other Products (Excl. Automotive)": A226,
        "Retail Trade of Other Products (Excl. Automotive)": A227,
        "Land Transport and Transport Via Pipelines": A228,
        "Water Transport": A229,
        "Air Transport": A230,
        "Warehousing and Support Activities for Transportation": A231,
        "Postal and Courier Activities": A232,
        "Accommodation Services": A233,
        "Food and Beverage Service Activities": A234,
        "Publishing Activities": A235,
        "Motion Picture, Video, Television Production, Sound and Music Production":
          A236,
        "Programming and Broadcasting Activities": A237,
        Telecommunications: A238,
        "Computer Programming, Consultancy and Related Activities": A239,
        "Information Service Activities": A240,
        "Financial Service Activities (Excl. Insurance and Pension Funding)":
          A241,
        "Insurance, Reinsurance, and Pension Funding (Excl. Compulsory Social Security)":
          A242,
        "Activities Auxiliary to Financial Services and Insurance Activities":
          A243,
        "Real Estate Activities": A244,
        "Legal and Accounting Activities": A245,
        "Management Consultancy": A246,
        "Architectural and Engineering Activities": A247,
        "Scientific Research and Development": A248,
        "Advertising and Market Research": A249,
        "Other Professional, Scientific and Technical Activities": A250,
        "Veterinary Activities": A251,
        "Rental and Leasing Activities": A252,
        "Employment Activities": A253,
        "Travel Agency, Tour Operator, Reservation Service and Related Activities":
          A254,
        "Security and Investigation Activities": A255,
        "Services to Buildings and Landscape Activities": A256,
        "Office Administrative and Other Business Support Activities": A257,
        Education: A258,
        "Human Health Activities": A259,
        "Residential Care Activities": A260,
        "Social Work Activities Without Accommodation": A261,
        "Creative, Arts and Entertainment Activities": A262,
        "Libraries, Archives, Museums and Other Cultural Activities": A263,
        "Gambling and Betting Activities": A264,
        "Sports Activities, Amusement and Recreation Activities": A265,
        "Activities of Membership Activities (Clubs, Associations, Organizations)":
          A266,
        "Repair of Computers, Personal and Household Goods": A267,
        "Other Personal Service Activities": A268,
      },
      companies_employees: A269,
      b2b_traffic: {
        [first_year]: A270 === "" ? 0 : A270,
        [second_year]: A271 === "" ? 0 : A271,
        [third_year]: A272 === "" ? 0 : A272,
        [fourth_year]: A273 === "" ? 0 : A273,
        [fifth_year]: A274 === "" ? 0 : A274,
      },
      b2b_execution: {
        [first_year]: A275 === "" ? 0 : A275,
        [second_year]: A276 === "" ? 0 : A276,
        [third_year]: A277 === "" ? 0 : A277,
        [fourth_year]: A278 === "" ? 0 : A278,
        [fifth_year]: A279 === "" ? 0 : A279,
      },
      technology_adabdability: A280,
      business_plan: user.business_plan_id,
    };

    //Api to save business model answers

    const save_business_model_answers_response = await saveBusinessModelAnswers(
      answers
    );
    if (save_business_model_answers_response.id) {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const business_model_answer_api_response = await businesModelAnswersAPI();
    if (business_model_answer_api_response) {
      nextStep();
    } else {
      setErrorNotHandled(true);
    }
  };
  if (error_not_handled) return <FallbackUI error={"Unhandled Error"} />;
  if (serverError) return <FallbackUI error={"Server Error"} />;
  return (
    <>
      <Loader
        loading={
          b2c_target_clientele_loading ||
          b2b_target_clientele_loading ||
          save_business_model_answers_loading
        }
      >
        <HandleUserExit />
        <Prompt message="Are you sure you want to leave without saving? " />
        <QuestionnaireContainer progress={"66"}>
          <form onSubmit={handleSubmit}>
            <NavigationButtons
              prev_button={true}
              submit_name={"Save And Continue"}
            />
            <section className="section">
              <div className="container bg-c-light py-4">
                <div className="row justify-content-center text-center">
                  <div className="col-md-12">
                    <h1>Business Model</h1>
                  </div>
                  {/* //Question 1 value: A21} */}
                  <Question question={Q1}>
                    <DropdownInputField
                      options={Q1.options}
                      editAnswer={editAnswerBM}
                      answer="A21"
                      value={A21}
                    />
                  </Question>

                  {A21 === "Both B2B & B2C" ? (
                    <div className="col-md-12">
                      <div className="sectionTitleDiv flexCenter">
                        <p className="fontsectionTitle  textCenterBorder1">
                          Business to Consumer (B2C) Questions
                        </p>
                      </div>
                    </div>
                  ) : null}
                  {A21 === "Business To Consumer (B2C)" ||
                  A21 === "Both B2B & B2C" ? (
                    <>
                      <Question question={Q2}>
                        <DropdownInputField
                          options={Q2.options}
                          editAnswer={editAnswerBM}
                          answer="A22"
                          value={A22}
                        />
                      </Question>
                      <Question question={Q3}>
                        <DropdownInputField
                          options={Q3.options}
                          editAnswer={editAnswerBM}
                          answer="A23"
                          value={A23}
                        />
                      </Question>
                      <Question question={Q4}>
                        <div className="form-check text-start">
                          <CheckBoxInputField
                            key={"all_ages"}
                            className={"form-check-input age"}
                            onClick={deRequireCb("age")}
                            editAnswer={updateMultipleAges}
                            option={"All Ages"}
                            update_all_array={age_brackets_answers}
                          />
                        </div>
                        {Q4.options.map((option, index) => {
                          return (
                            <div className="form-check text-start">
                              <CheckBoxInputField
                                key={index}
                                className={"form-check-input age"}
                                answer={age_brackets_answers[index]}
                                value={
                                  sectionBusinessModel[
                                    age_brackets_answers[index]
                                  ]
                                }
                                onClick={deRequireCb("age")}
                                editAnswer={editAnswerBM}
                                option={option}
                              />
                            </div>
                          );
                        })}
                      </Question>
                      <Question question={Q5}>
                        <div className="row">
                          <div className="col-4"></div>
                          <div className="col-1">{first_year}</div>
                          <div className="col-1">{second_year}</div>
                          <div className="col-1">{third_year}</div>
                          <div className="col-1">{fourth_year}</div>
                          <div className="col-1">{fifth_year}</div>
                          <div className="col-3">All Years</div>
                        </div>
                        {Object.entries(governorate_answers).map(
                          ([governorate, answers], index) => {
                            return (
                              <>
                                <div key={index} className="row">
                                  <div className="col-4">{governorate}</div>

                                  {answers.map((answer, index) => {
                                    return (
                                      <div key={index} className="col-1">
                                        <CheckBoxInputField
                                          key={index}
                                          className={
                                            "form-check-input gov-" +
                                            getDynamicYear(index)
                                          }
                                          answer={answer}
                                          visibility={false}
                                          onClick={deRequireCb(
                                            "gov-" + getDynamicYear(index)
                                          )}
                                          value={sectionBusinessModel[answer]}
                                          editAnswer={
                                            governorate === "All Governorates"
                                              ? updateMultipleGovernorates
                                              : editAnswerBM
                                          }
                                          update_all_array={getAllGovernoratesAnswersOfYear(
                                            index
                                          )}
                                        />
                                      </div>
                                    );
                                  })}

                                  {governorate === "All Governorates" ? (
                                    <div className="col-3">
                                      <CheckBoxInputField
                                        key={"all_governorates_all_years"}
                                        className={"form-check-input"}
                                        visibility={false}
                                        name={governorate}
                                        editAnswer={updateMultipleGovernorates}
                                        update_all_array={getAllGovernoratesAnswersAllYears()}
                                      />
                                    </div>
                                  ) : (
                                    <div className="col-3">
                                      <CheckBoxInputField
                                        key={
                                          "get_one_governorate_answersof_all_years"
                                        }
                                        className={"form-check-input"}
                                        visibility={false}
                                        name={governorate}
                                        editAnswer={updateMultipleGovernorates}
                                        update_all_array={getOneGovernorateAnswersofAllYears(
                                          governorate
                                        )}
                                      />
                                    </div>
                                  )}
                                </div>
                                <hr
                                  className="mt-3 mb-3"
                                  style={{
                                    color: "#ee2830",
                                    backgroundColor: "#ee2830",
                                    height: 3,
                                  }}
                                />
                                {/* <hr className="color-red" /> */}
                              </>
                            );
                          }
                        )}
                      </Question>
                      <Question question={Q6}>
                        <DropdownInputField
                          options={Q6.options}
                          editAnswer={editAnswerBM}
                          answer="A40"
                          value={A40}
                        />
                      </Question>
                      <div className="row">
                        <OverlayTrigger
                          placement="auto"
                          overlay={
                            <Tooltip>
                              Press the button each time after answering
                              previous questions to calculate your Target
                              clientele
                            </Tooltip>
                          }
                        >
                          <div>
                            <button
                              type="button"
                              className="btn btn-light border-red btn-lg rounded-pill m-4"
                              onClick={() => B2cTargetClientele()}
                            >
                              Calculate Target Clientele
                            </button>
                          </div>
                        </OverlayTrigger>
                      </div>

                      <Question question={Q7}>
                        <div className="row">
                          <div className="col-2"></div>
                          <div className="col-2">{first_year}</div>
                          <div className="col-2">{second_year}</div>
                          <div className="col-2">{third_year}</div>
                          <div className="col-2">{fourth_year}</div>
                          <div className="col-2">{fifth_year}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">Target Clientele</div>
                          <div className="col-2">
                            {b2c_tc1.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_tc2.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_tc3.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_tc4.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_tc5.toLocaleString("en-US")}
                          </div>
                        </div>
                        <hr className="color-red m-3" />
                        <div className="row">
                          <div className="col-2">Traffic Percentage</div>
                          {Object.entries({
                            A181: A181,
                            A182: A182,
                            A183: A183,
                            A184: A184,
                            A185: A185,
                          }).map(([key, answer], index) => {
                            return (
                              <div key={index} className="col-2">
                                <InputFieldPercentage
                                  key={index}
                                  className={"form-control text-center"}
                                  required={true}
                                  placeholder={Q7.Placeholder.P1}
                                  answer={key}
                                  editAnswer={editAnswerBM}
                                  value={answer}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <hr className="color-red m-3" />
                        <div className="row">
                          <div className="col-2">Potential Traffic</div>
                          <div className="col-2">
                            {b2c_pt1.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt2.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt3.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt4.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt5.toLocaleString("en-US")}
                          </div>
                        </div>
                      </Question>
                      <Question question={Q8}>
                        <div className="row">
                          <div className="col-2"></div>
                          <div className="col-2">{first_year}</div>
                          <div className="col-2">{second_year}</div>
                          <div className="col-2">{third_year}</div>
                          <div className="col-2">{fourth_year}</div>
                          <div className="col-2">{fifth_year}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">Potential Traffic</div>
                          <div className="col-2">
                            {b2c_pt1.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt2.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt3.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt4.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2c_pt5.toLocaleString("en-US")}
                          </div>
                        </div>
                        <hr className="color-red m-3" />
                        <div className="row">
                          <div className="col-2">Execution Percentage</div>
                          {Object.entries({
                            A186: A186,
                            A187: A187,
                            A188: A188,
                            A189: A189,
                            A190: A190,
                          }).map(([key, answer], index) => {
                            return (
                              <div key={index} className="col-2">
                                <InputFieldPercentage
                                  key={index}
                                  className={"form-control text-center"}
                                  required={true}
                                  placeholder={Q8.Placeholder.P1}
                                  answer={key}
                                  editAnswer={editAnswerBM}
                                  value={answer}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <hr className="color-red m-3" />
                        <div className="row">
                          <div className="col-2">Executed Volume</div>
                          <div className="col-2">
                            {(~~((b2c_pt1 * A186) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2c_pt2 * A187) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2c_pt3 * A188) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2c_pt4 * A189) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2c_pt5 * A190) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                        </div>
                      </Question>
                    </>
                  ) : null}

                  {A21 === "Both B2B & B2C" ? (
                    <div className="col-md-12">
                      <div className="sectionTitleDiv flexCenter">
                        <p className="fontsectionTitle  textCenterBorder1">
                          Business To Business (B2B) Questions
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {A21 === "Business To Business (B2B)" ||
                  A21 === "Both B2B & B2C" ? (
                    <>
                      <Question question={Q9}>
                        {Q9.options.map((option, index) => {
                          return (
                            <div key={index} className="form-check text-start">
                              <CheckBoxInputField
                                key={index}
                                className={"form-check-input industry"}
                                answer={industry_answers[index]}
                                value={
                                  sectionBusinessModel[industry_answers[index]]
                                }
                                onClick={deRequireCb("industry")}
                                editAnswer={editAnswerBM}
                                option={option}
                              />
                            </div>
                          );
                        })}
                      </Question>
                      <Question question={Q10}>
                        <DropdownInputField
                          options={Q10.options}
                          editAnswer={editAnswerBM}
                          answer="A269"
                          value={A269}
                        />
                      </Question>
                      <div className="row">
                        <OverlayTrigger
                          placement="auto"
                          overlay={
                            <Tooltip>
                              Press the button each time after answering
                              previous questions to calculate your Target
                              clientele
                            </Tooltip>
                          }
                        >
                          <div>
                            <button
                              type="button"
                              className="btn btn-light border-red btn-lg rounded-pill m-4"
                              onClick={B2bTargetClientele}
                            >
                              Calculate Target Clientele
                            </button>
                          </div>
                        </OverlayTrigger>
                      </div>

                      <Question question={Q11}>
                        <>
                          <div className="row">
                            <div className="col-2"></div>
                            <div className="col-2">{first_year}</div>
                            <div className="col-2">{second_year}</div>
                            <div className="col-2">{third_year}</div>
                            <div className="col-2">{fourth_year}</div>
                            <div className="col-2">{fifth_year}</div>
                          </div>
                          <div className="row">
                            <div className="col-2">Target Clientele</div>
                            <div className="col-2">
                              {b2b_tc1.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_tc2.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_tc3.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_tc4.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_tc5.toLocaleString("en-US")}
                            </div>
                          </div>
                          <hr className="color-red m-3" />
                          <div className="row">
                            <div className="col-2">Traffic Percentage</div>
                            {Object.entries({
                              A270: A270,
                              A271: A271,
                              A272: A272,
                              A273: A273,
                              A274: A274,
                            }).map(([key, answer], index) => {
                              return (
                                <div key={index} className="col-2">
                                  <InputFieldPercentage
                                    key={index}
                                    className={"form-control text-center"}
                                    required={true}
                                    placeholder={Q11.Placeholder.P1}
                                    answer={key}
                                    editAnswer={editAnswerBM}
                                    value={answer}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <hr className="color-red m-3" />
                          <div className="row">
                            <div className="col-2">Potential Traffic</div>
                            <div className="col-2">
                              {b2b_pt1.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_pt2.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_pt3.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_pt4.toLocaleString("en-US")}
                            </div>
                            <div className="col-2">
                              {b2b_pt5.toLocaleString("en-US")}
                            </div>
                          </div>
                        </>
                      </Question>
                      <Question question={Q12}>
                        <div className="row">
                          <div className="col-2"></div>
                          <div className="col-2">{first_year}</div>
                          <div className="col-2">{second_year}</div>
                          <div className="col-2">{third_year}</div>
                          <div className="col-2">{fourth_year}</div>
                          <div className="col-2">{fifth_year}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">Potential Traffic</div>
                          <div className="col-2">
                            {b2b_pt1.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2b_pt2.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2b_pt3.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2b_pt4.toLocaleString("en-US")}
                          </div>
                          <div className="col-2">
                            {b2b_pt5.toLocaleString("en-US")}
                          </div>
                        </div>
                        <hr className="color-red m-3" />
                        <div className="row">
                          <div className="col-2">Execution Percentage</div>
                          {Object.entries({
                            A275: A275,
                            A276: A276,
                            A277: A277,
                            A278: A278,
                            A279: A279,
                          }).map(([key, answer], index) => {
                            return (
                              <div key={index} className="col-2">
                                <InputFieldPercentage
                                  key={index}
                                  className={"form-control text-center"}
                                  required={true}
                                  placeholder={Q12.Placeholder.P1}
                                  answer={key}
                                  editAnswer={editAnswerBM}
                                  value={answer}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <hr className="color-red m-3" />
                        <div className="row">
                          <div className="col-2">Executed Volume</div>
                          <div className="col-2">
                            {(~~((b2b_pt1 * A275) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2b_pt2 * A276) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2b_pt3 * A277) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2b_pt4 * A278) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                          <div className="col-2">
                            {(~~((b2b_pt5 * A279) / 100)).toLocaleString(
                              "en-US"
                            )}
                          </div>
                        </div>
                      </Question>
                    </>
                  ) : null}
                  <Question question={Q13}>
                    <DropdownInputField
                      options={Q13.options}
                      editAnswer={editAnswerBM}
                      answer="A280"
                      value={A280}
                    />
                  </Question>
                </div>
              </div>
            </section>
            <NavigationButtons
              prev_button={true}
              submit_name={"Save And Continue"}
            />
          </form>
        </QuestionnaireContainer>
      </Loader>
    </>
  );
}

export default Section2;
