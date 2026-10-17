import { View, Text, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { PROFILE } from '../data/const';
import { COMPANY } from '../data/constants';
import { GlobalStyle } from '../styles/GlobalStyle';
import PrimaryButton from '../components/PrimaryButton';

export default function ProfilScreen() {
  const { role, setRole } = useApp();
  const erStuderende = role === 'student';

  // Der er intet login, så profilen viser enten den studerende eller
  // mock-virksomheden, afhængigt af den valgte rolle.
  const navn = erStuderende ? PROFILE.name : COMPANY.name;

  // Udleder initialer fra navnet til avatar-cirklen, fx "Simon Holst" → "SH"
  const initialer = navn
    .split(' ')
    .map((del) => del[0])
    .join('');

  return (
    <ScrollView style={GlobalStyle.container}>
      <View style={GlobalStyle.profileHeader}>
        <View style={GlobalStyle.avatarCircle}>
          <Text style={GlobalStyle.avatarInitials}>{initialer}</Text>
        </View>
        <Text style={GlobalStyle.profileName}>{navn}</Text>
        <Text style={GlobalStyle.profileEducation}>
          {erStuderende ? PROFILE.education : 'Virksomhedskonto (demo)'}
        </Text>
        {erStuderende && <Text style={GlobalStyle.profileBio}>{PROFILE.bio}</Text>}
      </View>

      {erStuderende && (
        <>
          <Text style={GlobalStyle.sectionLabel}>Kompetencer & interesser</Text>
          <View style={GlobalStyle.skillsWrap}>
            {PROFILE.skills.map((skill) => (
              <View key={skill} style={GlobalStyle.skillTag}>
                <Text style={GlobalStyle.skillTagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Rolleskift: én app kan vise begge sider af platformen i demoen.
          Bundfanerne i App.js skifter automatisk med rollen, og valget huskes. */}
      <Text style={GlobalStyle.sectionLabel}>Rolle</Text>
      <View style={GlobalStyle.roleCard}>
        <Text style={GlobalStyle.roleText}>
          Du bruger appen som: {erStuderende ? 'Studerende' : 'Virksomhed'}
        </Text>
        <PrimaryButton
          title={erStuderende ? 'Skift til virksomhed' : 'Skift til studerende'}
          onPress={() => setRole(erStuderende ? 'virksomhed' : 'student')}
        />
      </View>
    </ScrollView>
  );
}
