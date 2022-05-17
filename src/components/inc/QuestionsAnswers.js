import React, { useContext} from 'react';
import { GlobalContext } from "../../QuestionsContext/QuestionsGlobalState";
import { Years } from "./DynamicDates";
import moment from 'moment';

const QuestionsAnswers = ({navigation_component}) => {

    const {
        sectionClientBrief,
        sectionBusinessModel,
        sectionFinancialForecast,
        sectionBusinessModelQuestions,
        sectionClientBriefQuestions,
        sectionFinancialForecastQuestions,
      } = useContext(GlobalContext);
    
      const {First: first_year, Second: second_year, Third : third_year, Fourth: fourth_year, Fifth: fifth_year} = Years;

      const { A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A19, A20 } = sectionClientBrief;
      const {A21, A22, A23, A24, A25, A26, A27, A28, A29, A30, A31, A32, A33, A34, A35, A36, A37, A38, A39, A40,
        A41, A42, A43, A44, A45, A46, A47, A48, A49, A50, A51, A52, A53, A54, A55, A56, A57, A58, A59,
        A60, A61, A62, A63, A64, A65, A66, A67, A68, A69, A70, A71, A72, A73, A74, A75, A76, A77, A78,
        A79, A80, A81, A82, A83, A84, A85, A86, A87, A88, A89, A90, A91, A92, A93, A94, A95, A96, A97,
        A98, A99, A100, A101, A102, A103, A104, A105, A106, A107, A108, A109, A110, A111, A112, A113,
        A114, A115, A116, A117, A118, A119, A120, A121, A122, A123, A124, A125, A126, A127, A128, A129,
        A130, A131, A132, A133, A134, A135, A136, A137, A138, A139, A140, A141, A142, A143, A144, A145,
        A146, A147, A148, A149, A150, A151, A152, A153, A154, A155, A156, A157, A158, A159, A160, A161,
        A162, A163, A164, A165, A166, A167, A168, A169, A170, A171, A172, A173, A174, A175, A176, A177,
        A178, A179, A180, A181, A182, A183, A184, A185, A186, A187, A188, A189, A190, A191, A192, A193,
        A194, A195, A196, A197, A198, A199, A200, A201, A202, A203, A204, A205, A206, A207, A208, A209,
        A210, A211, A212, A213, A214, A215, A216, A217, A218, A219, A220, A221, A222, A223, A224, A225,
        A226, A227, A228, A229, A230, A231, A232, A233, A234, A235, A236, A237, A238, A239, A240, A241,
        A242, A243, A244, A245, A246, A247, A248, A249, A250, A251, A252, A253, A254, A255, A256, A257,
        A258, A259, A260, A261, A262, A263, A264, A265, A266, A267, A268, A269, A270, A271, A272, A273,
        A274, A275, A276, A277, A278, A279, A280 } = sectionBusinessModel;
        const {   A281, A282, A283, A284, A285, A286, A287, A288, A289,
            A290, A291, A292, A293, A294, A295, A296, A297, A298, A299, A300, A301, A302, A303, A304, A305,
            A306, A307, A308, A309, A310, A311, A312, A313, A314, A315, A316, A317, A318, A319, A320, A321,
            A322, A323, A324, A325, A326, A327, A328, A329, A330, A331, A332}  = sectionFinancialForecast;
  
        const {Q1, Q2, Q3, Q4, Q5, Q6, Q7}    = sectionClientBriefQuestions;
        const {Q1: BMQ1, Q2: BMQ2, Q3: BMQ3, Q4: BMQ4, Q5: BMQ5, Q6: BMQ6, Q7: BMQ7,Q8: BMQ8,Q9: BMQ9,Q10: BMQ10,Q11: BMQ11,Q12: BMQ12,Q13: BMQ13} = sectionBusinessModelQuestions;
        const {Q1: FFQ1, Q2: FFQ2, Q3: FFQ3, Q4: FFQ4, Q5: FFQ5, Q6: FFQ6, Q7: FFQ7,Q8: FFQ8,Q9: FFQ9,Q10: FFQ10,Q11: FFQ11,Q12: FFQ12,Q13 : FFQ13} = sectionFinancialForecastQuestions;
      
  
  return <div>
  <div className="container">
      <div className="row">
          <div className="col-md-12 text-center">
              <h2>Review Your Answers</h2>
              <div className="underline mx-auto"></div>
          </div>
      </div>
  </div>
  {navigation_component}
  <section className="section">
      <div className="container bg-c-light py-4">
          <div className="row justify-content-center text-center">
              <div className="col-md-12">
                  <h1>CLIENT BRIEF</h1>
                  <div className="underline mx-auto"></div>
              </div>
              <div className="col-md-9 question pt-5">
                  <h4 className="bg-red text-white py-4">{Q1.Question}</h4>
                  <h3 className="mb-3">{A1==="Other"?A2:A1}</h3>
                  <h4 className="bg-red text-white py-4">{Q2.Question}</h4>
                  <h3 className="mb-3">{A3}</h3>
                  <h4 className="bg-red text-white py-4">{Q3.Question}</h4>
                  <h3 className="mb-3">{A4?"Yes":"No"}</h3>
                  <h4 className="bg-red text-white py-4">{Q4.Question}</h4>
                  <h3 className="mb-3">Date: {moment(A5).format('DD-MM-YYYY')}</h3>
                  <h3 className="mb-3">Value: EGP {A6.toLocaleString()}</h3>
                  <h4 className="bg-red text-white py-4">{Q5.Question}</h4>
                  <h3 className="mb-3">{A7?"Yes":"No"}</h3>
                  {A7 === true ?
                      <div>
                          <h4 className="bg-red text-white py-4">{Q6.Question}</h4>
                          <h3 className="mb-3">Value: EGP {A8.toLocaleString()}</h3>
                          <h3 className="mb-3">Percentage: {A9} %</h3>
                          <h3 className="mb-3">Date: {moment(A10).format('DD-MM-YYYY')}</h3>
                      </div>
                      : null
                  }
                  <h4 className="bg-red text-white py-4">{Q7.Question}</h4>
                  <h3 className="mb-3"><u>Founder 1</u></h3>
                  <h3 className="mb-3">Name: {A11}, Role: {A12}, Stake: {A13} %</h3>
                  <h3 className="mb-3"><u>Founder 2</u></h3>
                  <h3 className="mb-3">{A14===""?"None":<>Name: {A14}, Role: {A15}, Stake: {A16} %</>}</h3>
                  <h3 className="mb-3"><u>Founder 3</u></h3>
                  <h3 className="mb-3">{A17===""?"None":<>Name: {A17}, Role: {A18}, Stake: {A19} %</>}</h3>
                  {A20===0?null :<> <h3 className="mb-3"><u>Other Founders</u></h3>
                  <h3 className="mb-3">Stake: {A20} %</h3></>}
                 
              </div>
          </div>
      </div>
  </section>
  <section className="section">
      <div className="container bg-c-light py-4">
          <div className="row justify-content-center text-center">
              <div className="col-md-12">
                  <h1>MARKET DYNAMICS</h1>
                  <div className="underline mx-auto"></div>
              </div>
              <div className="col-md-9 question pt-5">
                  <h4 className="bg-red text-white py-4">{BMQ1.Question}</h4>
                  <h3 className="mb-3">{A21}</h3>
                  {A21 === "Business To Consumer (B2C)" || A21 === "Both B2B & B2C" ?
                      <div>
                          <h4 className="bg-red text-white py-4">{BMQ2.Question}</h4>
                          <h3 className="mb-3">{A22}</h3>
                          <h4 className="bg-red text-white py-4">{BMQ3.Question}</h4>
                          <h3 className="mb-3">{A23}</h3>
                          <h4 className="bg-red text-white py-4">{BMQ4.Question}</h4>
                          <h3 className="mb-3">{A24 ? <div>Less than 5 years<br /></div> : null}{A25 ? <div>5 to 10<br /></div> : null}{A26 ? <div>10 to 15<br /></div> : null}
                              {A27 ? <div>15 to 20<br /></div> : null}{A28 ? <div>20 to 25<br /></div> : null}{A29 ? <div>25 to 30<br /></div> : null}
                              {A30 ? <div>30 to 35<br /></div> : null}{A31 ? <div>35 to 40<br /></div> : null}{A32 ? <div>40 to 45<br /></div> : null}
                              {A33 ? <div>45 to 50<br /></div> : null}{A34 ? <div>50 to 55<br /></div> : null}{A35 ? <div>55 to 60<br /></div> : null}
                              {A36 ? <div>60 to 65<br /></div> : null}{A37 ? <div>65 to 70<br /></div> : null}{A38 ? <div>70 to 75<br /></div> : null}
                              {A39 ? <div>75 Plus<br /></div> : null}</h3>
                          <h4 className="bg-red text-white py-4">{BMQ5.Question}</h4>
                          <h3 className="mb-3">{first_year}:   {A176 ? <div>All Governorates<br /></div> : <h3> {A41 ?  <div>Cairo<br /></div> : null} {A46 ? <div>Alexandria<br /></div> : null} {A51 ? <div>Port-Said<br /></div> : null}
                              {A56 ? <div>Suez<br /></div> : null} {A61 ? <div>Damietta<br /></div> : null} {A66 ? <div>Dakahlia<br /></div> : null} {A71 ? <div>Sharkia<br /></div> : null}
                              {A76 ? <div>Kalyoubia<br /></div> : null} {A81 ? <div>Kafr El Sheikh<br /></div> : null} {A86 ? <div>Gharbia<br /></div> : null}
                              {A91 ? <div>Menoufia<br /></div> : null} {A96 ? <div>Behera<br /></div> : null} {A101 ? <div>Ismailia<br /></div> : null}
                              {A106 ? <div>Giza<br /></div> : null} {A111 ? <div>Beni-suef<br /></div> : null} {A116 ? <div>Fayoum<br /></div> : null} {A121 ? <div>Menia<br /></div> : null}
                              {A126 ? <div>Asyout<br /></div> : null} {A131 ? <div>Suhag<br /></div> : null} {A136 ? <div>Qena<br /></div> : null} {A141 ? <div>Aswan<br /></div> : null}
                              {A146 ? <div>Luxor<br /></div> : null} {A151 ? <div>Red Sea<br /></div> : null} {A156 ? <div>El Wadi El Gedid<br /></div> : null}
                              {A161 ? <div>Matrouh<br /></div> : null} {A166 ? <div>North Sinai<br /></div> : null} {A171 ? <div>South Sinai<br /></div> : null} </h3>} </h3>
                            
                          <h3 className="mb-3">{second_year}:   {A177 ? <div>All Governorates<br /></div> : <h3>{A42 ? <div>Cairo<br /></div> : null} {A47 ? <div>Alexandria<br /></div> : null} {A52 ? <div>Port-Said<br /></div> : null}
                              {A57 ? <div>Suez<br /></div> : null} {A62 ? <div>Damietta<br /></div> : null} {A67 ? <div>Dakahlia<br /></div> : null} {A72 ? <div>Sharkia<br /></div> : null}
                              {A77 ? <div>Kalyoubia<br /></div> : null} {A82 ? <div>Kafr El Sheikh<br /></div> : null} {A87 ? <div>Gharbia<br /></div> : null}
                              {A92 ? <div>Menoufia<br /></div> : null} {A97 ? <div>Behera<br /></div> : null} {A102 ? <div>Ismailia<br /></div> : null}
                              {A107 ? <div>Giza<br /></div> : null} {A112 ? <div>Beni-suef<br /></div> : null} {A117 ? <div>Fayoum<br /></div> : null} {A122 ? <div>Menia<br /></div> : null}
                              {A127 ? <div>Asyout<br /></div> : null} {A132 ? <div>Suhag<br /></div> : null} {A137 ? <div>Qena<br /></div> : null} {A142 ? <div>Aswan<br /></div> : null}
                              {A147 ? <div>Luxor<br /></div> : null} {A152 ? <div>Red Sea<br /></div> : null} {A157 ? <div>El Wadi El Gedid<br /></div> : null}
                              {A162 ? <div>Matrouh<br /></div> : null} {A167 ? <div>North Sinai<br /></div> : null} {A172 ? <div>South Sinai<br /></div> : null}  </h3>} </h3>
                            
                          <h3 className="mb-3">{third_year}:  {A178 ? <div>All Governorates<br /></div> : <h3> {A43 ? <div>Cairo<br /></div> : null} {A48 ? <div>Alexandria<br /></div> : null} {A53 ? <div>Port-Said<br /></div> : null}
                              {A58 ? <div>Suez<br /></div> : null} {A63 ? <div>Damietta<br /></div> : null} {A68 ? <div>Dakahlia<br /></div> : null} {A73 ? <div>Sharkia<br /></div> : null}
                              {A78 ? <div>Kalyoubia<br /></div> : null} {A83 ? <div>Kafr El Sheikh<br /></div> : null} {A88 ? <div>Gharbia<br /></div> : null}
                              {A93 ? <div>Menoufia<br /></div> : null} {A98 ? <div>Behera<br /></div> : null} {A103 ? <div>Ismailia<br /></div> : null}
                              {A108 ? <div>Giza<br /></div> : null} {A113 ? <div>Beni-suef<br /></div> : null} {A118 ? <div>Fayoum<br /></div> : null} {A123 ? <div>Menia<br /></div> : null}
                              {A128 ? <div>Asyout<br /></div> : null} {A133 ? <div>Suhag<br /></div> : null} {A138 ? <div>Qena<br /></div> : null} {A143 ? <div>Aswan<br /></div> : null}
                              {A148 ? <div>Luxor<br /></div> : null} {A153 ? <div>Red Sea<br /></div> : null} {A158 ? <div>El Wadi El Gedid<br /></div> : null}
                              {A163 ? <div>Matrouh<br /></div> : null} {A168 ? <div>North Sinai<br /></div> : null} {A173 ? <div>South Sinai<br /></div> : null} </h3>} </h3>
                             
                          <h3 className="mb-3">{fourth_year}:  {A179 ? <div>All Governorates<br /></div> :  <h3>{A44 ? <div>Cairo<br /></div> : null} {A49 ? <div>Alexandria<br /></div> : null} {A54 ? <div>Port-Said<br /></div> : null}
                              {A59 ? <div>Suez<br /></div> : null} {A64 ? <div>Damietta<br /></div> : null} {A69 ? <div>Dakahlia<br /></div> : null} {A74 ? <div>Sharkia<br /></div> : null}
                              {A79 ? <div>Kalyoubia<br /></div> : null} {A84 ? <div>Kafr El Sheikh<br /></div> : null} {A89 ? <div>Gharbia<br /></div> : null}
                              {A94 ? <div>Menoufia<br /></div> : null} {A99 ? <div>Behera<br /></div> : null} {A104 ? <div>Ismailia<br /></div> : null}
                              {A109 ? <div>Giza<br /></div> : null} {A114 ? <div>Beni-suef<br /></div> : null} {A119 ? <div>Fayoum<br /></div> : null} {A124 ? <div>Menia<br /></div> : null}
                              {A129 ? <div>Asyout<br /></div> : null} {A134 ? <div>Suhag<br /></div> : null} {A139 ? <div>Qena<br /></div> : null} {A144 ? <div>Aswan<br /></div> : null}
                              {A149 ? <div>Luxor<br /></div> : null} {A154 ? <div>Red Sea<br /></div> : null} {A159 ? <div>El Wadi El Gedid<br /></div> : null}
                              {A164 ? <div>Matrouh<br /></div> : null} {A169 ? <div>North Sinai<br /></div> : null} {A174 ? <div>South Sinai<br /></div> : null} </h3>} </h3>
                           
                          <h3 className="mb-3">{fifth_year}:   {A180 ? <div>All Governorates<br /></div> : <h3> {A45 ? <div>Cairo<br /></div> : null} {A50 ? <div>Alexandria<br /></div> : null} {A55 ? <div>Port-Said<br /></div> : null}
                              {A60 ? <div>Suez<br /></div> : null} {A65 ? <div>Damietta<br /></div> : null} {A70 ? <div>Dakahlia<br /></div> : null}{A75 ? <div>Sharkia<br /></div> : null}
                              {A80 ? <div>Kalyoubia<br /></div> : null} {A85 ? <div>Kafr El Sheikh<br /></div> : null} {A90 ? <div>Gharbia<br /></div> : null}
                              {A95 ? <div>Menoufia<br /></div> : null} {A100 ? <div>Behera<br /></div> : null} {A105 ? <div>Ismailia<br /></div> : null}
                              {A110 ? <div>Giza<br /></div> : null} {A115 ? <div>Beni-suef<br /></div> : null} {A120 ? <div>Fayoum<br /></div> : null} {A125 ? <div>Menia<br /></div> : null}
                              {A130 ? <div>Asyout<br /></div> : null} {A135 ? <div>Suhag<br /></div> : null} {A140 ? <div>Qena<br /></div> : null} {A145 ? <div>Aswan<br /></div> : null}
                              {A150 ? <div>Luxor<br /></div> : null} {A155 ? <div>Red Sea<br /></div> : null} {A160 ? <div>El Wadi El Gedid<br /></div> : null}
                              {A165 ? <div>Matrouh<br /></div> : null} {A170 ? <div>North Sinai<br /></div> : null} {A175 ? <div>South Sinai<br /></div> : null} </h3>} </h3>
                           
                          <h4 className="bg-red text-white py-4">{BMQ6.Question}</h4>
                          <h3 className="mb-3">{A40}</h3>
                          <h4 className="bg-red text-white py-4">{BMQ7.Question}</h4>
                          <h3 className="mb-3">{first_year}: {A181} %</h3>
                          <h3 className="mb-3">{second_year}: {A182} %</h3>
                          <h3 className="mb-3">{third_year}: {A183} %</h3>
                          <h3 className="mb-3">{fourth_year}: {A184} %</h3>
                          <h3 className="mb-3">{fifth_year}: {A185} %</h3>
                          <h4 className="bg-red text-white py-4">{BMQ8.Question}</h4>
                          <h3 className="mb-3">{first_year}: {A186} %</h3>
                          <h3 className="mb-3">{second_year}: {A187} %</h3>
                          <h3 className="mb-3">{third_year}: {A188} %</h3>
                          <h3 className="mb-3">{fourth_year}: {A189} %</h3>
                          <h3 className="mb-3">{fifth_year}: {A190} %</h3>
                      </div>
                      : null
                  }
                  {A21 === "Business To Business (B2B)" || A21 === "Both B2B & B2C" ?
                      <div>
                          <h4 className="bg-red text-white py-4">{BMQ9.Question}</h4>
                          <h3 className="mb-3">{A191 ? <div>Agriculture (Crop, Animal Production and Related Services)<br /></div> : null} {A192 ? <div>Forestry and Logging<br /></div> : null}
                              {A193 ? <div>Fishing and Aquaculture<br /></div> : null} {A194 ? <div>Mining and Quarrying<br /></div> : null} {A195 ? <div>Manufacturing of Food Products<br /></div> : null}
                              {A196 ? <div>Manufacturing of Beverages<br /></div> : null} {A197 ? <div>Manufacturing of Tobacco Products<br /></div> : null}
                              {A198 ? <div>Manufacturing of Textiles<br /></div> : null} {A199 ? <div>Manufacturing of Wearing Apparel<br /></div> : null}
                              {A200 ? <div>Manufacturing of Leather and Related Products<br /></div> : null} {A201 ? <div>Manufacturing of Wood, Cork (Excl. Furniture), Straw and Plaiting Materials<br /></div> : null}
                              {A202 ? <div>Manufacturing of Paper and Related Products<br /></div> : null} {A203 ? <div>Printing and Reproduction of Recorded Media<br /></div> : null}
                              {A204 ? <div>Manufacturing of Coke and Refined Petroleum Products<br /></div> : null} {A205 ? <div>Manufacturing of Chemical Products<br /></div> : null}
                              {A206 ? <div>Manufacturing of Pharmaceuticals, Medicinal Chemical and Botanical Products<br /></div> : null}
                              {A207 ? <div>Manufacturing of Rubber and Plastics Products<br /></div> : null} {A208 ? <div>Manufacturing of Other Non-metallic Mineral Products<br /></div> : null}
                              {A209 ? <div>Manufacturing of Basic Metals<br /></div> : null} {A210 ? <div>Manufacturing of Fabricated Metal Products (Excl. Machinery and Equipment)<br /></div> : null}
                              {A211 ? <div>Manufacturing of Computer, Electronic and Optical Products<br /></div> : null} {A212 ? <div>Manufacturing of Electrical Equipment<br /></div> : null}
                              {A213 ? <div>Manufacturing of Machinery and Equipment N.E.C.<br /></div> : null} {A214 ? <div>Manufacturing of Motor Vehicles, Trailers and Semi-trailers<br /></div> : null}
                              {A215 ? <div>Manufacturing of Other Transport Equipment<br /></div> : null} {A216 ? <div>Manufacturing of Furniture<br /></div> : null}
                              {A217 ? <div>Other Manufacturing<br /></div> : null} {A218 ? <div>Repair and Installation of Machinery and Equipment<br /></div> : null}
                              {A219 ? <div>Electricity, Gas, Steam and Air Conditioning Supply<br /></div> : null} {A220 ? <div>Water Collection, Treatment, and Supply<br /></div> : null}
                              {A221 ? <div>Sewage<br /></div> : null} {A222 ? <div>Construction of Buildings<br /></div> : null} {A223 ? <div>Civil Engineering<br /></div> : null}
                              {A224 ? <div>Specialized Construction Activities<br /></div> : null} {A225 ? <div>Wholesales and Retail Trade of Automotive Products<br /></div> : null}
                              {A226 ? <div>Wholesale Trade of Other Products (Excl. Automotive)<br /></div> : null} {A227 ? <div>Retail Trade of Other Products (Excl. Automotive)<br /></div> : null}
                              {A228 ? <div>Land Transport and Transport Via Pipelines<br /></div> : null} {A229 ? <div>Water Transport<br /></div> : null} {A230 ? <div>Air Transport<br /></div> : null}
                              {A231 ? <div>Warehousing and Support Activities for Transportation<br /></div> : null} {A232 ? <div>Postal and Courier Activities<br /></div> : null}
                              {A233 ? <div>Accommodation Services<br /></div> : null} {A234 ? <div>Food and Beverage Service Activities<br /></div> : null}
                              {A235 ? <div>Publishing Activities<br /></div> : null} {A236 ? <div>Motion Picture, Video, Television Production, Sound and Music Production<br /></div> : null}
                              {A237 ? <div>Programming and Broadcasting Activities<br /></div> : null} {A238 ? <div>Telecommunications<br /></div> : null}
                              {A239 ? <div>Computer Programming, Consultancy and Related Activities<br /></div> : null} {A240 ? <div>Information Service Activities<br /></div> : null}
                              {A241 ? <div>Financial Service Activities (Excl. Insurance and Pension Funding)<br /></div> : null}
                              {A242 ? <div>Insurance, Reinsurance, and Pension Funding (Excl. Compulsory Social Security)<br /></div> : null}
                              {A243 ? <div>Activities Auxiliary to Financial Services and Insurance Activities<br /></div> : null} {A244 ? <div>Real Estate Activities<br /></div> : null}
                              {A245 ? <div>Legal and Accounting Activities<br /></div> : null} {A246 ? <div>Management Consultancy<br /></div> : null} {A247 ? <div>Architectural and Engineering Activities<br /></div> : null}
                              {A248 ? <div>Scientific Research and Development<br /></div> : null} {A249 ? <div>Advertising and Market Research<br /></div> : null}
                              {A250 ? <div>Other Professional, Scientific and Technical Activities<br /></div> : null} {A251 ? <div>Veterinary Activities<br /></div> : null}
                              {A252 ? <div>Rental and Leasing Activities<br /></div> : null} {A253 ? <div>Employment Activities<br /></div> : null}
                              {A254 ? <div>Travel Agency, Tour Operator, Reservation Service and Related Activities<br /></div> : null} {A255 ? <div>Security and Investigation Activities<br /></div> : null}
                              {A256 ? <div>Services to Buildings and Landscape Activities<br /></div> : null} {A257 ? <div>Office Administrative and Other Business Support Activities<br /></div> : null}
                              {A258 ? <div>Education<br /></div> : null} {A259 ? <div>Human Health Activities<br /></div> : null} {A260 ? <div>Residential Care Activities<br /></div> : null}
                              {A261 ? <div>Social Work Activities Without Accommodation<br /></div> : null} {A262 ? <div>Creative, Arts and Entertainment Activities<br /></div> : null}
                              {A263 ? <div>Libraries, Archives, Museums and Other Cultural Activities<br /></div> : null} {A264 ? <div>Gambling and Betting Activities<br /></div> : null}
                              {A265 ? <div>Sports Activities, Amusement and Recreation Activities<br /></div> : null} {A266 ? <div>Activities of Membership Activities (Clubs, Associations, Organizations)<br /></div> : null}
                              {A267 ? <div>Repair of Computers, Personal and Household Goods<br /></div> : null} {A268 ? <div>Other Personal Service Activities<br /></div> : null}</h3>
                          <h4 className="bg-red text-white py-4">{BMQ10.Question}</h4>
                          <h3 className="mb-3">{A269}</h3>
                          <h4 className="bg-red text-white py-4">{BMQ11.Question}</h4>
                          <h3 className="mb-3">{first_year}: {A270} %</h3>
                          <h3 className="mb-3">{second_year}: {A271} %</h3>
                          <h3 className="mb-3">{third_year}: {A272} %</h3>
                          <h3 className="mb-3">{fourth_year}: {A273} %</h3>
                          <h3 className="mb-3">{fifth_year}: {A274} %</h3>
                          <h4 className="bg-red text-white py-4">{BMQ12.Question}</h4>
                          <h3 className="mb-3">{first_year}: {A275} %</h3>
                          <h3 className="mb-3">{second_year}: {A276} %</h3>
                          <h3 className="mb-3">{third_year}: {A277} %</h3>
                          <h3 className="mb-3">{fourth_year}: {A278} %</h3>
                          <h3 className="mb-3">{fifth_year}: {A279} %</h3>
                      </div>
                      : null
                  }
                  <h4 className="bg-red text-white py-4">{BMQ13.Question}</h4>
                  <h3 className="mb-3">{A280}</h3>
              </div>
          </div>
      </div>
  </section>
  <section className="section">
      <div className="container bg-c-light py-4">
          <div className="row justify-content-center text-center">
              <div className="col-md-12">
                  <h1>FINANCIAL FORECAST</h1>
                  <div className="underline mx-auto"></div>
              </div>
              <div className="col-md-9 question pt-5">
                  <h4 className="bg-red text-white py-4">{FFQ1.Question}</h4>
                  <h3 className="mb-3">{A281}</h3>
                  <h4 className="bg-red text-white py-4">{FFQ2.Question}</h4>
                  <h3 className="mb-3">EGP {A282.toLocaleString()}</h3>
                  <h4 className="bg-red text-white py-4">{FFQ3.Question}</h4>
                  <h3 className="mb-3">{A283} %</h3>
                  <h4 className="bg-red text-white py-4">{FFQ4.Question}</h4>
                  <h3 className="mb-3">{A284}</h3>
                  <h4 className="bg-red text-white py-4">{FFQ5.Question}</h4>
                  <h3 className="mb-3">{A285}</h3>
                  <h4 className="bg-red text-white py-4">{FFQ6.Question}</h4>
                  <h3 className="mb-3">{A286}</h3>
                  <h4 className="bg-red text-white py-4">{FFQ7.Question}</h4>
                  <h3 className="mb-3">Collection days: {A287} Days</h3>
                  <h3 className="mb-3">Payment days: {A288} Days</h3>
                  <h4 className="bg-red text-white py-4">{FFQ8.Question}</h4>
                  <h3 className="mb-3">Facebook: {A289} %</h3>
                  <h3 className="mb-3">Instagram: {A290} %</h3>
                  <h3 className="mb-3">Google Ads: {A291} %</h3>
                  <h3 className="mb-3">Linkedin: {A292} %</h3>
                  <h3 className="mb-3">SMS: {A293} %</h3>
                  <h4 className="bg-red text-white py-4">{FFQ9.Question}</h4>
                  <h3 className="mb-3">{first_year}: {A294} Video(s), {A299} Post(s)</h3>
                  <h3 className="mb-3">{second_year}: {A295} Video(s), {A300} Post(s)</h3>
                  <h3 className="mb-3">{third_year}: {A296} Video(s), {A301} Post(s)</h3>
                  <h3 className="mb-3">{fourth_year}: {A297} Video(s), {A302} Post(s)</h3>
                  <h3 className="mb-3">{fifth_year}: {A298} Video(s), {A303} Post(s)</h3>
                  <h4 className="bg-red text-white py-4">{FFQ10.Question}</h4>
                  <h3 className="mb-3">Videos: EGP {A304.toLocaleString()}</h3>
                  <h3 className="mb-3">Posts: EGP {A305.toLocaleString()}</h3>
                  <h4 className="bg-red text-white py-4">{FFQ11.Question}</h4>  
                  <h3 className="mb-3"><u>Management</u></h3>
                  {A306 === ""? <h3 className="mb-3">0 Employees</h3>:<h3 className="mb-3">{A306} Employee(s), EGP {A307.toLocaleString()}, {moment(A308).format('DD-MM-YYYY')}</h3>}
                  <h3 className="mb-3"><u>Finance/Accounting</u></h3>
                  {A309 === ""? <h3 className="mb-3">0 Employees</h3>:<h3 className="mb-3">{A309} Employee(s), EGP {A310.toLocaleString()}, {moment(A311).format('DD-MM-YYYY')}</h3>}
                  <h3 className="mb-3"><u>Marketing</u></h3>
                  {A312 === ""? <h3 className="mb-3">0 Employees</h3>:<h3 className="mb-3">{A312} Employee(s), EGP {A313.toLocaleString()}, {moment(A314).format('DD-MM-YYYY')}</h3>}
                  <h3 className="mb-3"><u>Sales</u></h3>
                  {A315 === ""? <h3 className="mb-3">0 Employees</h3>:<h3 className="mb-3">{A315} Employee(s), EGP {A316.toLocaleString()}, {moment(A317).format('DD-MM-YYYY')}</h3>}
                  <h3 className="mb-3"><u>Business Development</u></h3>
                  {A318 === ""? <h3 className="mb-3">0 Employees</h3>:<h3 className="mb-3">{A318} Employee(s), EGP {A319.toLocaleString()}, {moment(A320).format('DD-MM-YYYY')}</h3>}
                  <h3 className="mb-3"><u>Software Development</u></h3>
                  {A321 === ""? <h3 className="mb-3">0 Employees</h3>:<h3 className="mb-3">{A321} Employee(s), EGP {A322.toLocaleString()}, {moment(A323).format('DD-MM-YYYY')}</h3>}
                  <h3 className="mb-3"><u>Other</u></h3>
                  {A324 === ""? <h3 className="mb-3">0 Employees</h3>:<h3 className="mb-3">{A324} Employee(s), EGP {A325.toLocaleString()}, {moment(A326).format('DD-MM-YYYY')}</h3>}
                  <h4 className="bg-red text-white py-4">{FFQ12.Question}</h4>
                  <h3 className="mb-3">Office: EGP {A327.toLocaleString()}</h3>
                  <h3 className="mb-3">Utilities: EGP {A328.toLocaleString()}</h3>
                  <h4 className="bg-red text-white py-4">{FFQ13.Question}</h4>
                  <h3 className="mb-3">Software Assets: EGP {A329.toLocaleString()}</h3>
                  <h3 className="mb-3">Furniture, Equipment and Machinery: EGP {A330.toLocaleString()}</h3>
                  <h3 className="mb-3">Vehicles: EGP {A331.toLocaleString()}</h3>
                  <h3 className="mb-3">Average Price Per Computer: EGP {A332.toLocaleString()}</h3>
              </div>
          </div>
      </div>
  </section>
</div >
;
};

export default QuestionsAnswers;
