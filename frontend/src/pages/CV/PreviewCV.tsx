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
        borderRadius: 8,
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
