export const Reducer = (state, action) => {
  // function that takes a vlue to check if it is a zero to return empty string -> part of back end validaton schema

  const editZeroValues = (value) => {
    if (value === 0) {
      return "";
    } else {
      return value;
    }
  };

  switch (action.type) {
    case "UPDATE_MULTIPLE_GOVERNORATES":
      const newSectionBusinessModel = { ...state.sectionBusinessModel };
      action.payload.answers.map((answer) => {
        return (newSectionBusinessModel[answer] = action.payload.value);
      });

      return {
        ...state,
        sectionBusinessModel: newSectionBusinessModel,
      };

    case "UPDATE_MULTIPLE_AGES":
      const newSectionBusinessModelAges = { ...state.sectionBusinessModel };
      action.payload.answers.map((answer) => {
        return (newSectionBusinessModelAges[answer] = action.payload.value);
      });

      return {
        ...state,
        sectionBusinessModel: newSectionBusinessModelAges,
      };

    case "EDIT_ANSWERCB":
      const newObject = { ...state.sectionClientBrief };
      newObject[action.payload.key] = action.payload.answer;

      return {
        ...state,
        sectionClientBrief: newObject,
      };

    case "EDIT_STEP":
      return {
        ...state,
        step: action.payload.step,
      };

    case "USER_LOGIN":
      const newObjectUser = { ...state.user };
      newObjectUser["username"] = action.payload.username;
      newObjectUser["user_id"] = action.payload.user_id;
      newObjectUser["email"] = action.payload.email;
      newObjectUser["access_token_expiration_date"] = action.payload.access_exp;
      newObjectUser["refresh_token_expiration_date"] =
        action.payload.refresh_exp;
      newObjectUser["is_authenticated"] = true;
      return {
        ...state,
        user: newObjectUser,
      };

    case "CREATE_UNFINISHED_BUSINESS_PLAN":
      const newObjectUnfinishedBusinessPlan = { ...state.user };
      newObjectUnfinishedBusinessPlan["business_plan_name"] =
        action.payload.business_plan_name;
      newObjectUnfinishedBusinessPlan["business_plan_id"] =
        action.payload.business_plan_id;
      newObjectUnfinishedBusinessPlan["is_new_business_plan"] = false;
      return {
        ...state,
        user: newObjectUnfinishedBusinessPlan,
      };

    case "CLEAR_BUSINESS_PLAN":
      const newObjectClearBusinessPlan = { ...state.user };
      newObjectClearBusinessPlan["business_plan_name"] = "";
      newObjectClearBusinessPlan["business_plan_id"] = null;
      newObjectClearBusinessPlan["is_new_business_plan"] = false;
      newObjectClearBusinessPlan["business_plan_is_purchased"] = false;
      return {
        ...state,
        user: newObjectClearBusinessPlan,
        step: 1,
      };

    case "SET_BUSINESSPLAN_ID":
      const newObjectBusinessPlanId = { ...state.user };
      newObjectBusinessPlanId["business_plan_id"] =
        action.payload.business_plan_id;
      return {
        ...state,
        user: newObjectBusinessPlanId,
      };

    case "SET_BUSINESSPLAN_IS_PURCHASED":
      return {
        ...state,
        user: {
          ...state.user,
          business_plan_is_purchased: action.payload.purchase_truth_value,
        },
      };

    case "SYNC_REQUEST":
      return { ...state, items: action.payload };

    case "CREATE_NEW_BUSINESS_PLAN":
      const newObjectNewBusinessPlan = { ...state.user };
      newObjectNewBusinessPlan["business_plan_name"] =
        action.payload.business_plan_name;
      newObjectNewBusinessPlan["business_plan_id"] = null;
      newObjectNewBusinessPlan["is_new_business_plan"] = true;
      const newObjectSCBA = {
        ...action.payload.initialState.sectionClientBrief,
      };
      const newObjectSBMA = {
        ...action.payload.initialState.sectionBusinessModel,
      };
      const newObjectSFFA = {
        ...action.payload.initialState.sectionFinancialForecast,
      };
      return {
        ...state,
        user: newObjectNewBusinessPlan,
        sectionClientBrief: newObjectSCBA,
        sectionBusinessModel: newObjectSBMA,
        sectionFinancialForecast: newObjectSFFA,
      };

    case "USER_LOGOUT":
      const newState = { ...action.payload.initialState };
      return newState;

    case "EDIT_USER":
      const newUserObject = { ...state.user };
      newUserObject[action.payload.key] = action.payload.value;

      return {
        ...state,
        user: newUserObject,
      };

    case "GET_CLIENT_BRIEF_ANSWERS":
      const answers = action.payload.answers;
      // const boolean to check if sector name incoming from backend is in the sector name options
      const check_sector_name =
        state.sectionClientBriefQuestions.Q1.options.includes(
          answers.sector_name
        );
      const newObjectGCBA = {
        A1: check_sector_name ? answers.sector_name : "Other",
        A2: check_sector_name ? "" : answers.sector_name,
        A3: answers.development_stage,
        A4: answers.is_established,
        A5: answers.establishment.date,
        A6: answers.establishment.capital,
        A7: answers.is_raised_funding,
        A8: answers.funding_raised.value,
        A9: answers.funding_raised.percentage,
        A10: answers.funding_raised.date,
        A11: answers.founders.founder1.name,
        A12: answers.founders.founder1.role,
        A13:
          answers.founders.founder1.stake === 0
            ? ""
            : answers.founders.founder1.stake, // converting zeros to empty string to correspont with back end validation schema
        A14: answers.founders.founder2.name,
        A15: answers.founders.founder2.role,
        A16:
          answers.founders.founder2.stake === 0
            ? ""
            : answers.founders.founder2.stake,
        A17: answers.founders.founder3.name,
        A18: answers.founders.founder3.role,
        A19:
          answers.founders.founder3.stake === 0
            ? ""
            : answers.founders.founder3.stake,
        A20: answers.founders["other founders"].stake,
      };

      return {
        ...state,
        sectionClientBrief: newObjectGCBA,
      };

    case "GET_BUSINESS_MODEL_ANSWERS":
      const answersBM = action.payload.answers;

      const newObjectGBMA = {
        A21: answersBM.business_model,
        A22: answersBM.income_clientele,
        A23: answersBM.individuals_households,
        A24: answersBM.age_bracket["Less than 5 years"],
        A25: answersBM.age_bracket["5 to 10"],
        A26: answersBM.age_bracket["10 to 15"],
        A27: answersBM.age_bracket["15 to 20"],
        A28: answersBM.age_bracket["20 to 25"],
        A29: answersBM.age_bracket["25 to 30"],
        A30: answersBM.age_bracket["30 to 35"],
        A31: answersBM.age_bracket["35 to 40"],
        A32: answersBM.age_bracket["40 to 45"],
        A33: answersBM.age_bracket["45 to 50"],
        A34: answersBM.age_bracket["50 to 55"],
        A35: answersBM.age_bracket["55 to 60"],
        A36: answersBM.age_bracket["60 to 65"],
        A37: answersBM.age_bracket["65 to 70"],
        A38: answersBM.age_bracket["70 to 75"],
        A39: answersBM.age_bracket["75 plus"],
        A40: answersBM.internet_accessability,
        A41: answersBM.governorates["2022"].Cairo,
        A42: answersBM.governorates["2023"].Cairo,
        A43: answersBM.governorates["2024"].Cairo,
        A44: answersBM.governorates["2025"].Cairo,
        A45: answersBM.governorates["2026"].Cairo,
        A46: answersBM.governorates["2022"].Alexandria,
        A47: answersBM.governorates["2023"].Alexandria,
        A48: answersBM.governorates["2024"].Alexandria,
        A49: answersBM.governorates["2025"].Alexandria,
        A50: answersBM.governorates["2026"].Alexandria,
        A51: answersBM.governorates["2022"]["Port-Said"],
        A52: answersBM.governorates["2023"]["Port-Said"],
        A53: answersBM.governorates["2024"]["Port-Said"],
        A54: answersBM.governorates["2025"]["Port-Said"],
        A55: answersBM.governorates["2026"]["Port-Said"],
        A56: answersBM.governorates["2022"].Suez,
        A57: answersBM.governorates["2023"].Suez,
        A58: answersBM.governorates["2024"].Suez,
        A59: answersBM.governorates["2025"].Suez,
        A60: answersBM.governorates["2026"].Suez,
        A61: answersBM.governorates["2022"].Damietta,
        A62: answersBM.governorates["2023"].Damietta,
        A63: answersBM.governorates["2024"].Damietta,
        A64: answersBM.governorates["2025"].Damietta,
        A65: answersBM.governorates["2026"].Damietta,
        A66: answersBM.governorates["2022"].Dakahlia,
        A67: answersBM.governorates["2023"].Dakahlia,
        A68: answersBM.governorates["2024"].Dakahlia,
        A69: answersBM.governorates["2025"].Dakahlia,
        A70: answersBM.governorates["2026"].Dakahlia,
        A71: answersBM.governorates["2022"].Sharkia,
        A72: answersBM.governorates["2023"].Sharkia,
        A73: answersBM.governorates["2024"].Sharkia,
        A74: answersBM.governorates["2025"].Sharkia,
        A75: answersBM.governorates["2026"].Sharkia,
        A76: answersBM.governorates["2022"].Kalyoubia,
        A77: answersBM.governorates["2023"].Kalyoubia,
        A78: answersBM.governorates["2024"].Kalyoubia,
        A79: answersBM.governorates["2025"].Kalyoubia,
        A80: answersBM.governorates["2026"].Kalyoubia,
        A81: answersBM.governorates["2022"]["Kafr El Sheikh"],
        A82: answersBM.governorates["2023"]["Kafr El Sheikh"],
        A83: answersBM.governorates["2024"]["Kafr El Sheikh"],
        A84: answersBM.governorates["2025"]["Kafr El Sheikh"],
        A85: answersBM.governorates["2026"]["Kafr El Sheikh"],
        A86: answersBM.governorates["2022"].Gharbia,
        A87: answersBM.governorates["2023"].Gharbia,
        A88: answersBM.governorates["2024"].Gharbia,
        A89: answersBM.governorates["2025"].Gharbia,
        A90: answersBM.governorates["2026"].Gharbia,
        A91: answersBM.governorates["2022"].Menoufia,
        A92: answersBM.governorates["2023"].Menoufia,
        A93: answersBM.governorates["2024"].Menoufia,
        A94: answersBM.governorates["2025"].Menoufia,
        A95: answersBM.governorates["2026"].Menoufia,
        A96: answersBM.governorates["2022"].Behera,
        A97: answersBM.governorates["2023"].Behera,
        A98: answersBM.governorates["2024"].Behera,
        A99: answersBM.governorates["2025"].Behera,
        A100: answersBM.governorates["2026"].Behera,
        A101: answersBM.governorates["2022"].Ismailia,
        A102: answersBM.governorates["2023"].Ismailia,
        A103: answersBM.governorates["2024"].Ismailia,
        A104: answersBM.governorates["2025"].Ismailia,
        A105: answersBM.governorates["2026"].Ismailia,
        A106: answersBM.governorates["2022"].Giza,
        A107: answersBM.governorates["2023"].Giza,
        A108: answersBM.governorates["2024"].Giza,
        A109: answersBM.governorates["2025"].Giza,
        A110: answersBM.governorates["2026"].Giza,
        A111: answersBM.governorates["2022"]["Beni-suef"],
        A112: answersBM.governorates["2023"]["Beni-suef"],
        A113: answersBM.governorates["2024"]["Beni-suef"],
        A114: answersBM.governorates["2025"]["Beni-suef"],
        A115: answersBM.governorates["2026"]["Beni-suef"],
        A116: answersBM.governorates["2022"].Fayoum,
        A117: answersBM.governorates["2023"].Fayoum,
        A118: answersBM.governorates["2024"].Fayoum,
        A119: answersBM.governorates["2025"].Fayoum,
        A120: answersBM.governorates["2026"].Fayoum,
        A121: answersBM.governorates["2022"].Menia,
        A122: answersBM.governorates["2023"].Menia,
        A123: answersBM.governorates["2024"].Menia,
        A124: answersBM.governorates["2025"].Menia,
        A125: answersBM.governorates["2026"].Menia,
        A126: answersBM.governorates["2022"].Asyout,
        A127: answersBM.governorates["2023"].Asyout,
        A128: answersBM.governorates["2024"].Asyout,
        A129: answersBM.governorates["2025"].Asyout,
        A130: answersBM.governorates["2026"].Asyout,
        A131: answersBM.governorates["2022"].Suhag,
        A132: answersBM.governorates["2023"].Suhag,
        A133: answersBM.governorates["2024"].Suhag,
        A134: answersBM.governorates["2025"].Suhag,
        A135: answersBM.governorates["2026"].Suhag,
        A136: answersBM.governorates["2022"].Qena,
        A137: answersBM.governorates["2023"].Qena,
        A138: answersBM.governorates["2024"].Qena,
        A139: answersBM.governorates["2025"].Qena,
        A140: answersBM.governorates["2026"].Qena,
        A141: answersBM.governorates["2022"].Aswan,
        A142: answersBM.governorates["2023"].Aswan,
        A143: answersBM.governorates["2024"].Aswan,
        A144: answersBM.governorates["2025"].Aswan,
        A145: answersBM.governorates["2026"].Aswan,
        A146: answersBM.governorates["2022"].Luxor,
        A147: answersBM.governorates["2023"].Luxor,
        A148: answersBM.governorates["2024"].Luxor,
        A149: answersBM.governorates["2025"].Luxor,
        A150: answersBM.governorates["2026"].Luxor,
        A151: answersBM.governorates["2022"]["Red Sea"],
        A152: answersBM.governorates["2023"]["Red Sea"],
        A153: answersBM.governorates["2024"]["Red Sea"],
        A154: answersBM.governorates["2025"]["Red Sea"],
        A155: answersBM.governorates["2026"]["Red Sea"],
        A156: answersBM.governorates["2022"]["El Wadi El Gedid"],
        A157: answersBM.governorates["2023"]["El Wadi El Gedid"],
        A158: answersBM.governorates["2024"]["El Wadi El Gedid"],
        A159: answersBM.governorates["2025"]["El Wadi El Gedid"],
        A160: answersBM.governorates["2026"]["El Wadi El Gedid"],
        A161: answersBM.governorates["2022"].Matrouh,
        A162: answersBM.governorates["2023"].Matrouh,
        A163: answersBM.governorates["2024"].Matrouh,
        A164: answersBM.governorates["2025"].Matrouh,
        A165: answersBM.governorates["2026"].Matrouh,
        A166: answersBM.governorates["2022"]["North Sinai"],
        A167: answersBM.governorates["2023"]["North Sinai"],
        A168: answersBM.governorates["2024"]["North Sinai"],
        A169: answersBM.governorates["2025"]["North Sinai"],
        A170: answersBM.governorates["2026"]["North Sinai"],
        A171: answersBM.governorates["2022"]["South Sinai"],
        A172: answersBM.governorates["2023"]["South Sinai"],
        A173: answersBM.governorates["2024"]["South Sinai"],
        A174: answersBM.governorates["2025"]["South Sinai"],
        A175: answersBM.governorates["2026"]["South Sinai"],
        // A176 is true if user selected all governorates in 2022, A177 -> 2023, A178 -> 2024 , A179 -> 2025, A180 -> 2026
        A176:
          answersBM.governorates["2022"].Cairo &&
          answersBM.governorates["2022"].Alexandria &&
          answersBM.governorates["2022"]["Port-Said"] &&
          answersBM.governorates["2022"].Suez &&
          answersBM.governorates["2022"].Damietta &&
          answersBM.governorates["2022"].Dakahlia &&
          answersBM.governorates["2022"].Sharkia &&
          answersBM.governorates["2022"].Kalyoubia &&
          answersBM.governorates["2022"]["Kafr El Sheikh"] &&
          answersBM.governorates["2022"].Gharbia &&
          answersBM.governorates["2022"].Menoufia &&
          answersBM.governorates["2022"].Behera &&
          answersBM.governorates["2022"].Ismailia &&
          answersBM.governorates["2022"].Giza &&
          answersBM.governorates["2022"]["Beni-suef"] &&
          answersBM.governorates["2022"].Fayoum &&
          answersBM.governorates["2022"].Menia &&
          answersBM.governorates["2022"].Asyout &&
          answersBM.governorates["2022"].Suhag &&
          answersBM.governorates["2022"].Qena &&
          answersBM.governorates["2022"].Aswan &&
          answersBM.governorates["2022"].Luxor &&
          answersBM.governorates["2022"]["Red Sea"] &&
          answersBM.governorates["2022"]["El Wadi El Gedid"] &&
          answersBM.governorates["2022"].Matrouh &&
          answersBM.governorates["2022"]["North Sinai"] &&
          answersBM.governorates["2022"]["South Sinai"],
        A177:
          answersBM.governorates["2023"].Cairo &&
          answersBM.governorates["2023"].Alexandria &&
          answersBM.governorates["2023"]["Port-Said"] &&
          answersBM.governorates["2023"].Suez &&
          answersBM.governorates["2023"].Damietta &&
          answersBM.governorates["2023"].Dakahlia &&
          answersBM.governorates["2023"].Sharkia &&
          answersBM.governorates["2023"].Kalyoubia &&
          answersBM.governorates["2023"]["Kafr El Sheikh"] &&
          answersBM.governorates["2023"].Gharbia &&
          answersBM.governorates["2023"].Menoufia &&
          answersBM.governorates["2023"].Behera &&
          answersBM.governorates["2023"].Ismailia &&
          answersBM.governorates["2023"].Giza &&
          answersBM.governorates["2023"]["Beni-suef"] &&
          answersBM.governorates["2023"].Fayoum &&
          answersBM.governorates["2023"].Menia &&
          answersBM.governorates["2023"].Asyout &&
          answersBM.governorates["2023"].Suhag &&
          answersBM.governorates["2023"].Qena &&
          answersBM.governorates["2023"].Aswan &&
          answersBM.governorates["2023"].Luxor &&
          answersBM.governorates["2023"]["Red Sea"] &&
          answersBM.governorates["2023"]["El Wadi El Gedid"] &&
          answersBM.governorates["2023"].Matrouh &&
          answersBM.governorates["2023"]["North Sinai"] &&
          answersBM.governorates["2023"]["South Sinai"],
        A178:
          answersBM.governorates["2024"].Cairo &&
          answersBM.governorates["2024"].Alexandria &&
          answersBM.governorates["2024"]["Port-Said"] &&
          answersBM.governorates["2024"].Suez &&
          answersBM.governorates["2024"].Damietta &&
          answersBM.governorates["2024"].Dakahlia &&
          answersBM.governorates["2024"].Sharkia &&
          answersBM.governorates["2024"].Kalyoubia &&
          answersBM.governorates["2024"]["Kafr El Sheikh"] &&
          answersBM.governorates["2024"].Gharbia &&
          answersBM.governorates["2024"].Menoufia &&
          answersBM.governorates["2024"].Behera &&
          answersBM.governorates["2024"].Ismailia &&
          answersBM.governorates["2024"].Giza &&
          answersBM.governorates["2024"]["Beni-suef"] &&
          answersBM.governorates["2024"].Fayoum &&
          answersBM.governorates["2024"].Menia &&
          answersBM.governorates["2024"].Asyout &&
          answersBM.governorates["2024"].Suhag &&
          answersBM.governorates["2024"].Qena &&
          answersBM.governorates["2024"].Aswan &&
          answersBM.governorates["2024"].Luxor &&
          answersBM.governorates["2024"]["Red Sea"] &&
          answersBM.governorates["2024"]["El Wadi El Gedid"] &&
          answersBM.governorates["2024"].Matrouh &&
          answersBM.governorates["2024"]["North Sinai"] &&
          answersBM.governorates["2024"]["South Sinai"],
        A179:
          answersBM.governorates["2025"].Cairo &&
          answersBM.governorates["2025"].Alexandria &&
          answersBM.governorates["2025"]["Port-Said"] &&
          answersBM.governorates["2025"].Suez &&
          answersBM.governorates["2025"].Damietta &&
          answersBM.governorates["2025"].Dakahlia &&
          answersBM.governorates["2025"].Sharkia &&
          answersBM.governorates["2025"].Kalyoubia &&
          answersBM.governorates["2025"]["Kafr El Sheikh"] &&
          answersBM.governorates["2025"].Gharbia &&
          answersBM.governorates["2025"].Menoufia &&
          answersBM.governorates["2025"].Behera &&
          answersBM.governorates["2025"].Ismailia &&
          answersBM.governorates["2025"].Giza &&
          answersBM.governorates["2025"]["Beni-suef"] &&
          answersBM.governorates["2025"].Fayoum &&
          answersBM.governorates["2025"].Menia &&
          answersBM.governorates["2025"].Asyout &&
          answersBM.governorates["2025"].Suhag &&
          answersBM.governorates["2025"].Qena &&
          answersBM.governorates["2025"].Aswan &&
          answersBM.governorates["2025"].Luxor &&
          answersBM.governorates["2025"]["Red Sea"] &&
          answersBM.governorates["2025"]["El Wadi El Gedid"] &&
          answersBM.governorates["2025"].Matrouh &&
          answersBM.governorates["2025"]["North Sinai"] &&
          answersBM.governorates["2025"]["South Sinai"],
        A180:
          answersBM.governorates["2026"].Cairo &&
          answersBM.governorates["2026"].Alexandria &&
          answersBM.governorates["2026"]["Port-Said"] &&
          answersBM.governorates["2026"].Suez &&
          answersBM.governorates["2026"].Damietta &&
          answersBM.governorates["2026"].Dakahlia &&
          answersBM.governorates["2026"].Sharkia &&
          answersBM.governorates["2026"].Kalyoubia &&
          answersBM.governorates["2026"]["Kafr El Sheikh"] &&
          answersBM.governorates["2026"].Gharbia &&
          answersBM.governorates["2026"].Menoufia &&
          answersBM.governorates["2026"].Behera &&
          answersBM.governorates["2026"].Ismailia &&
          answersBM.governorates["2026"].Giza &&
          answersBM.governorates["2026"]["Beni-suef"] &&
          answersBM.governorates["2026"].Fayoum &&
          answersBM.governorates["2026"].Menia &&
          answersBM.governorates["2026"].Asyout &&
          answersBM.governorates["2026"].Suhag &&
          answersBM.governorates["2026"].Qena &&
          answersBM.governorates["2026"].Aswan &&
          answersBM.governorates["2026"].Luxor &&
          answersBM.governorates["2026"]["Red Sea"] &&
          answersBM.governorates["2026"]["El Wadi El Gedid"] &&
          answersBM.governorates["2026"].Matrouh &&
          answersBM.governorates["2026"]["North Sinai"] &&
          answersBM.governorates["2026"]["South Sinai"],
        A181: editZeroValues(answersBM.b2c_traffic["2022"]),
        A182: editZeroValues(answersBM.b2c_traffic["2023"]),
        A183: editZeroValues(answersBM.b2c_traffic["2024"]),
        A184: editZeroValues(answersBM.b2c_traffic["2025"]),
        A185: editZeroValues(answersBM.b2c_traffic["2026"]),
        A186: editZeroValues(answersBM.b2c_execution["2022"]),
        A187: editZeroValues(answersBM.b2c_execution["2023"]),
        A188: editZeroValues(answersBM.b2c_execution["2024"]),
        A189: editZeroValues(answersBM.b2c_execution["2025"]),
        A190: editZeroValues(answersBM.b2c_execution["2026"]),
        A191: answersBM.industries[
          "Agriculture (Crop, Animal Production and Related Services)"
        ],
        A192: answersBM.industries["Forestry and Logging"],
        A193: answersBM.industries["Fishing and Aquaculture"],
        A194: answersBM.industries["Mining and Quarrying"],
        A195: answersBM.industries["Manufacturing of Food Products"],
        A196: answersBM.industries["Manufacturing of Beverages"],
        A197: answersBM.industries["Manufacturing of Tobacco Products"],
        A198: answersBM.industries["Manufacturing of Textiles"],
        A199: answersBM.industries["Manufacturing of Wearing Apparel"],
        A200: answersBM.industries[
          "Manufacturing of Leather and Related Products"
        ],
        A201: answersBM.industries[
          "Manufacturing of Wood, Cork (Excl. Furniture), Straw and Plaiting Materials"
        ],
        A202: answersBM.industries[
          "Manufacturing of Paper and Related Products"
        ],
        A203: answersBM.industries[
          "Printing and Reproduction of Recorded Media"
        ],
        A204: answersBM.industries[
          "Manufacturing of Coke and Refined Petroleum Products"
        ],
        A205: answersBM.industries["Manufacturing of Chemical Products"],
        A206: answersBM.industries[
          "Manufacturing of Pharmaceuticals, Medicinal Chemical and Botanical Products"
        ],
        A207: answersBM.industries[
          "Manufacturing of Rubber and Plastics Products"
        ],
        A208: answersBM.industries[
          "Manufacturing of Other Non-metallic Mineral Products"
        ],
        A209: answersBM.industries["Manufacturing of Basic Metals"],
        A210: answersBM.industries[
          "Manufacturing of Fabricated Metal Products (Excl. Machinery and Equipment)"
        ],
        A211: answersBM.industries[
          "Manufacturing of Computer, Electronic and Optical Products"
        ],
        A212: answersBM.industries["Manufacturing of Electrical Equipment"],
        A213: answersBM.industries[
          "Manufacturing of Machinery and Equipment N.E.C."
        ],
        A214: answersBM.industries[
          "Manufacturing of Motor Vehicles, Trailers and Semi-trailers"
        ],
        A215: answersBM.industries[
          "Manufacturing of Other Transport Equipment"
        ],
        A216: answersBM.industries["Manufacturing of Furniture"],
        A217: answersBM.industries["Other Manufacturing"],
        A218: answersBM.industries[
          "Repair and Installation of Machinery and Equipment"
        ],
        A219: answersBM.industries[
          "Electricity, Gas, Steam and Air Conditioning Supply"
        ],
        A220: answersBM.industries["Water Collection, Treatment, and Supply"],
        A221: answersBM.industries["Sewage"],
        A222: answersBM.industries["Construction of Buildings"],
        A223: answersBM.industries["Civil Engineering"],
        A224: answersBM.industries["Specialized Construction Activities"],
        A225: answersBM.industries[
          "Wholesales and Retail Trade of Automotive Products"
        ],
        A226: answersBM.industries[
          "Wholesale Trade of Other Products (Excl. Automotive)"
        ],
        A227: answersBM.industries[
          "Retail Trade of Other Products (Excl. Automotive)"
        ],
        A228: answersBM.industries[
          "Land Transport and Transport Via Pipelines"
        ],
        A229: answersBM.industries["Water Transport"],
        A230: answersBM.industries["Air Transport"],
        A231: answersBM.industries[
          "Warehousing and Support Activities for Transportation"
        ],
        A232: answersBM.industries["Postal and Courier Activities"],
        A233: answersBM.industries["Accommodation Services"],
        A234: answersBM.industries["Food and Beverage Service Activities"],
        A235: answersBM.industries["Publishing Activities"],
        A236: answersBM.industries[
          "Motion Picture, Video, Television Production, Sound and Music Production"
        ],
        A237: answersBM.industries["Programming and Broadcasting Activities"],
        A238: answersBM.industries["Telecommunications"],
        A239: answersBM.industries[
          "Computer Programming, Consultancy and Related Activities"
        ],
        A240: answersBM.industries["Information Service Activities"],
        A241: answersBM.industries[
          "Financial Service Activities (Excl. Insurance and Pension Funding)"
        ],
        A242: answersBM.industries[
          "Insurance, Reinsurance, and Pension Funding (Excl. Compulsory Social Security)"
        ],
        A243: answersBM.industries[
          "Activities Auxiliary to Financial Services and Insurance Activities"
        ],
        A244: answersBM.industries["Real Estate Activities"],
        A245: answersBM.industries["Legal and Accounting Activities"],
        A246: answersBM.industries["Management Consultancy"],
        A247: answersBM.industries["Architectural and Engineering Activities"],
        A248: answersBM.industries["Scientific Research and Development"],
        A249: answersBM.industries["Advertising and Market Research"],
        A250: answersBM.industries[
          "Other Professional, Scientific and Technical Activities"
        ],
        A251: answersBM.industries["Veterinary Activities"],
        A252: answersBM.industries["Rental and Leasing Activities"],
        A253: answersBM.industries["Employment Activities"],
        A254: answersBM.industries[
          "Travel Agency, Tour Operator, Reservation Service and Related Activities"
        ],
        A255: answersBM.industries["Security and Investigation Activities"],
        A256: answersBM.industries[
          "Services to Buildings and Landscape Activities"
        ],
        A257: answersBM.industries[
          "Office Administrative and Other Business Support Activities"
        ],
        A258: answersBM.industries["Education"],
        A259: answersBM.industries["Human Health Activities"],
        A260: answersBM.industries["Residential Care Activities"],
        A261: answersBM.industries[
          "Social Work Activities Without Accommodation"
        ],
        A262: answersBM.industries[
          "Creative, Arts and Entertainment Activities"
        ],
        A263: answersBM.industries[
          "Libraries, Archives, Museums and Other Cultural Activities"
        ],
        A264: answersBM.industries["Gambling and Betting Activities"],
        A265: answersBM.industries[
          "Sports Activities, Amusement and Recreation Activities"
        ],
        A266: answersBM.industries[
          "Activities of Membership Activities (Clubs, Associations, Organizations)"
        ],
        A267: answersBM.industries[
          "Repair of Computers, Personal and Household Goods"
        ],
        A268: answersBM.industries["Other Personal Service Activities"],
        A269: answersBM.companies_employees,
        A270: editZeroValues(answersBM.b2b_traffic["2022"]),
        A271: editZeroValues(answersBM.b2b_traffic["2023"]),
        A272: editZeroValues(answersBM.b2b_traffic["2024"]),
        A273: editZeroValues(answersBM.b2b_traffic["2025"]),
        A274: editZeroValues(answersBM.b2b_traffic["2026"]),
        A275: editZeroValues(answersBM.b2b_execution["2022"]),
        A276: editZeroValues(answersBM.b2b_execution["2023"]),
        A277: editZeroValues(answersBM.b2b_execution["2024"]),
        A278: editZeroValues(answersBM.b2b_execution["2025"]),
        A279: editZeroValues(answersBM.b2b_execution["2026"]),
        A280: answersBM.technology_adabdability,
      };

      return {
        ...state,
        sectionBusinessModel: newObjectGBMA,
      };

    case "GET_FINANCIAL_FORECAST_ANSWERS":
      const answersFF = action.payload.answers;

      const newObjectGFFA = {
        A281: answersFF.revenue_model,
        A282: answersFF.price,
        A283: answersFF.gross_profit_margin,
        A284: answersFF.price_growth,
        A285: answersFF.cost_growth,
        A286: answersFF.sales_receipts,
        A287: answersFF.collect_pay.collect_days,
        A288: answersFF.collect_pay.pay_days,
        A289: answersFF.marketing_channels.facebook,
        A290: answersFF.marketing_channels.instagram,
        A291: answersFF.marketing_channels.google,
        A292: answersFF.marketing_channels.linkedin,
        A293: answersFF.marketing_channels.sms,
        A294: answersFF.marketing_plan["2022"].videos,
        A295: answersFF.marketing_plan["2023"].videos,
        A296: answersFF.marketing_plan["2024"].videos,
        A297: answersFF.marketing_plan["2025"].videos,
        A298: answersFF.marketing_plan["2026"].videos,
        A299: answersFF.marketing_plan["2022"].posts,
        A300: answersFF.marketing_plan["2023"].posts,
        A301: answersFF.marketing_plan["2024"].posts,
        A302: answersFF.marketing_plan["2025"].posts,
        A303: answersFF.marketing_plan["2026"].posts,
        A304: answersFF.marketing_cost.videos,
        A305: answersFF.marketing_cost.posts,
        A306: editZeroValues(answersFF.employees.Management.number),
        A307: editZeroValues(answersFF.employees.Management.salaries),
        A308: editZeroValues(answersFF.employees.Management.hire_date),
        A309: editZeroValues(answersFF.employees["Finance/Accounting"].number),
        A310: editZeroValues(
          answersFF.employees["Finance/Accounting"].salaries
        ),
        A311: editZeroValues(
          answersFF.employees["Finance/Accounting"].hire_date
        ),
        A312: editZeroValues(answersFF.employees.Marketing.number),
        A313: editZeroValues(answersFF.employees.Marketing.salaries),
        A314: editZeroValues(answersFF.employees.Marketing.hire_date),
        A315: editZeroValues(answersFF.employees.Sales.number),
        A316: editZeroValues(answersFF.employees.Sales.salaries),
        A317: editZeroValues(answersFF.employees.Sales.hire_date),
        A318: editZeroValues(
          answersFF.employees["Business Development"].number
        ),
        A319: editZeroValues(
          answersFF.employees["Business Development"].salaries
        ),
        A320: editZeroValues(
          answersFF.employees["Business Development"].hire_date
        ),
        A321: editZeroValues(
          answersFF.employees["Software Development"].number
        ),
        A322: editZeroValues(
          answersFF.employees["Software Development"].salaries
        ),
        A323: editZeroValues(
          answersFF.employees["Software Development"].hire_date
        ),
        A324: editZeroValues(answersFF.employees["Other"].number),
        A325: editZeroValues(answersFF.employees["Other"].salaries),
        A326: editZeroValues(answersFF.employees["Other"].hire_date),
        A327: answersFF.office_utilities_cost.office,
        A328: answersFF.office_utilities_cost.utilities,
        A329: answersFF.fixed_assets.software,
        A330: answersFF.fixed_assets.office,
        A331: answersFF.fixed_assets.vehicles,
        A332: answersFF.fixed_assets.computer,
      };

      return {
        ...state,
        sectionFinancialForecast: newObjectGFFA,
      };

    case "EDIT_ANSWERBM":
      const newObjectBM = { ...state.sectionBusinessModel };
      newObjectBM[action.payload.key] = action.payload.answer;

      return {
        ...state,
        sectionBusinessModel: newObjectBM,
      };
    case "EDIT_ANSWERFF":
      const newObjectFF = { ...state.sectionFinancialForecast };
      newObjectFF[action.payload.key] = action.payload.answer;

      return {
        ...state,
        sectionFinancialForecast: newObjectFF,
      };

    case "INCREASE_STEP":
      return { ...state, step: state.step + 1 };
    case "DECREASE_STEP":
      return { ...state, step: state.step - 1 };

    default:
      return state;
  }
};
