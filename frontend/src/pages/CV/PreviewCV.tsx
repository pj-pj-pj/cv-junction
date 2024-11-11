// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Education, PersonalInfo, WorkExperience } from "@/types/types";
// import { forwardRef } from "react";

// const PreviewCV = forwardRef<
//   HTMLDivElement,
//   {
//     personalInfo: PersonalInfo;
//     summary: string | undefined;
//     education: Education[] | undefined;
//     workExperience: WorkExperience[] | undefined;
//   }
// >(({ personalInfo, summary, education, workExperience }, ref) => {
//   return (
//     <Card
//       id="cv"
//       ref={ref}
//       className="bg-white h-[calc(100vh-108px)] p-2 [&::-webkit-scrollbar]:w-2
//   [&::-webkit-scrollbar-track]:rounded-full
//   [&::-webkit-scrollbar-track]:bg-gray-100
//   [&::-webkit-scrollbar-thumb]:rounded-full
//   [&::-webkit-scrollbar-thumb]:bg-gray-300 overflow-y-auto"
//     >
//       <CardContent className="p-12">
//         <h1 className="text-3xl font-bold mb-1 flex justify-center">
//           {personalInfo.full_name}
//         </h1>
//         <div className="text-sm mb-4 flex gap-2 justify-center">
//           {personalInfo.email && (
//             <>
//               <span>{personalInfo.email}</span>
//               <span>{"|"}</span>
//             </>
//           )}
//           {personalInfo.phone_number && (
//             <>
//               <span>{personalInfo.phone_number}</span>
//               <span>{personalInfo.phone_number && "|"}</span>
//             </>
//           )}
//           <span>{personalInfo.address}</span>
//         </div>
//         {summary && (
//           <div className="mb-4 ">
//             <h2 className="text-sm font-semibold">Summary</h2>
//             <Separator />
//             <p className="pl-2 text-justify mt-1">{summary}</p>
//           </div>
//         )}

//         <div className="mb-4">
//           {workExperience?.length != 0 && (
//             <>
//               <h2 className="text-sm font-semibold">Work Experience</h2>
//               <Separator />
//             </>
//           )}
//           {workExperience?.map((exp) => (
//             <div
//               key={exp.work_id}
//               className="mb-1 pl-2 text-justify mt-1"
//             >
//               <span className="flex justify-between">
//                 <h3 className="text-sm font-semibold">{exp.company_name}</h3>
//                 <p className="text-sm">
//                   {exp.start_date} - {exp.end_date}
//                 </p>
//               </span>
//               <span className="flex justify-between italic">
//                 <p>{exp.job_title}</p>
//                 <p>{exp.address}</p>
//               </span>
//               <ul className="list-disc list-inside pl-6 text-justify">
//                 {exp.bullet_details.map((detail, index) => (
//                   <li key={index}>{detail}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="mb-4">
//           {education?.length != 0 && (
//             <>
//               <h2 className="text-sm font-semibold">Education</h2>
//               <Separator />
//             </>
//           )}
//           {education?.map((edu) => (
//             <div
//               key={edu.education_id}
//               className="mb-4 pl-2 text-justify mt-1"
//             >
//               <span className="flex justify-between">
//                 <h3 className="text-sm font-semibold">{edu.institution}</h3>
//                 <p className="text-sm">
//                   {edu.start_date} - {edu.end_date}
//                 </p>
//               </span>

//               <span className="flex justify-between italic">
//                 <p>{edu.degree}</p>
//                 <p>{edu.address}</p>
//               </span>
//               <ul className="list-disc list-inside pl-6 text-justify">
//                 {edu.additional_details?.map((detail, index) => (
//                   <li key={index}>{detail}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default PreviewCV;

import { Education, PersonalInfo, WorkExperience } from "@/types/types";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import font from "./Sentient-Regular.ttf";

Font.register({
  family: "Sentient",
  format: "truetype",
  src: font,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  section: {
    margin: "0 0 10 0",
  },
  header: {
    fontSize: 24,
    marginBottom: 2,
    textAlign: "center",
    fontFamily: "Sentient",
  },
  subHeader: {
    fontSize: 12,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "black",
    borderBottom: "1 solid #7B7B7B",
    fontFamily: "Sentient",
  },
  text: {
    fontSize: 11,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    marginLeft: 15,
  },
  bullet: {
    width: 10,
    fontSize: 11,
  },
});

function PreviewCV({
  personalInfo,
  summary,
  education,
  workExperience,
}: {
  personalInfo: PersonalInfo;
  summary: string | undefined;
  education: Education[] | undefined;
  workExperience: WorkExperience[] | undefined;
}) {
  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "calc(100vh - 108px)",
      }}
    >
      <Document>
        <Page
          size="A4"
          style={styles.page}
        >
          <View style={styles.section}>
            <Text style={styles.header}>{personalInfo.full_name}</Text>
            <Text style={styles.subHeader}>
              {personalInfo.email && `${personalInfo.email} | `}
              {personalInfo.phone_number && `${personalInfo.phone_number} | `}
              {personalInfo.address}
            </Text>
          </View>

          {summary && (
            <View style={styles.section}>
              <Text style={styles.title}>Professional Summary</Text>
              <Text style={styles.text}>{summary}</Text>
            </View>
          )}

          {workExperience && workExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Work Experience</Text>
              {workExperience.map((exp) => (
                <View
                  key={exp.work_id}
                  style={{ marginBottom: 4 }}
                >
                  <View style={styles.row}>
                    <Text style={[styles.text, { fontStyle: "italic" }]}>
                      {exp.company_name}
                    </Text>
                    <Text
                      style={styles.text}
                    >{`${exp.start_date} - ${exp.end_date}`}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={[styles.text, styles.italic, { marginBottom: 2 }]}
                    >
                      {exp.job_title}
                    </Text>
                    <Text style={[styles.text, styles.italic]}>
                      {exp.address}
                    </Text>
                  </View>
                  {exp.bullet_details.map((detail, index) => (
                    <View
                      key={index}
                      style={[styles.row, styles.list]}
                    >
                      <Text style={styles.bullet}>•</Text>
                      <Text style={[styles.text, { flex: 1 }]}>{detail}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {education && education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Education</Text>
              {education.map((edu) => (
                <View
                  key={edu.education_id}
                  style={{ marginBottom: 4 }}
                >
                  <View style={styles.row}>
                    <Text style={[styles.text, styles.bold]}>
                      {edu.institution}
                    </Text>
                    <Text
                      style={styles.text}
                    >{`${edu.start_date} - ${edu.end_date}`}</Text>
                  </View>
                  <View style={[styles.row, { marginBottom: 2 }]}>
                    <Text style={[styles.text, styles.italic]}>
                      {edu.degree}
                    </Text>
                    <Text style={[styles.text, styles.italic]}>
                      {edu.address}
                    </Text>
                  </View>
                  {edu.additional_details?.map((detail, index) => (
                    <View
                      key={index}
                      style={[styles.row, styles.list]}
                    >
                      <Text style={styles.bullet}>•</Text>
                      <Text style={[styles.text, { flex: 1 }]}>{detail}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PreviewCV;
