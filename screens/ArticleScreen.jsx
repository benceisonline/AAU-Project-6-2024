import React from 'react'; 
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const { height, width } = Dimensions.get('window');

const articleData = [
    {
        author: { name: 'Peter Degenkolv', imageID: '' },
        article: {
          title: 'Altan.dk under konkursbehandling: Ledende medarbejder politianmeldt',
          coverImage: require('../assets/cool_building.jpg'),
          category: 'Penge',
          timestamp: '29. aug. 2023 kl. 10:34',
          text: `'Kære Familie. I morgen, når fløjten lyder for sidste gang, er kampen slut for mig, og min tid i Altan.dk er forbi'.

Sådan indleder den administrerende direktør i Danmarks største altanvirksomhed, Altan.dk, Casper Knudsen, i en mail, der er sendt ud til sine medarbejdere, som Ekstra Bladet er i besiddelse af.

Til Ekstra Bladet bekræfter virksomhedens presseansvarlige, Morten Huse Eikrem-Jeppesen, at selskabet i dag 29. august er taget under konkursbehandling.

'Altan.dk er i dag 29. august blevet taget under konkursbehandling på baggrund af en begæring indgivet af Gældsstyrelsen.'

'Umiddelbart efter at selskabet modtog konkursbegæringen, har selskabet med bistand fra selskabets revision og med juridisk bistand indledt et udredningsarbejde.'

'Mens udredningsarbejdet har stået på, har det været forsøgt at sikre den fortsatte drift ved at undersøge mulighederne for at tilføre Altan.dk mere kapital og/eller et helt eller delvist salg af virksomheden. Dette har ikke været muligt,' skriver Altan.dk til Ekstra Bladet.

Ifølge Ekstra Bladets oplysninger har Gældsstyrelsen gjort krav på et stort millionbeløb.

Medarbejder bortvist og politianmeldt
Altan.dk oplyser til Ekstra Bladet, at en ledende medarbejder i forbindelse med udredningen af virksomheden er blevet politianmeldt, fordi der er fundet uregelmæssigheder i selskabets bogholderi.

'Også på den baggrund måtte det konstateres, at det ikke har været muligt at fortsætte virksomhedens drift.'

'Udredningsarbejdet har endvidere medført, at ledelsen har bortvist og politianmeldt en ledende medarbejder i selskabets økonomifunktion,' oplyser virksomheden til Ekstra Bladet.

Ifølge virksomhedens seneste regnskab havde de 108 medarbejdere ansat. Selskabet har også ifølge seneste regnskab en egenkapital på 33 mio. kr., men alligevel har Altan.dk ikke været i stand til at betale det beløb, som Gældsstyrelsen kræver.

Både selskabets direktør Casper Gorm Knudsen og virksomhedens bestyrelsesformand Allan Søgaard Larsen afviser at stille op til interview, men henviser til kurator, der fortsat er i gang med at danne sig et overblik over sagen.

Cathrine Wollenberg Zittan fra Kammeradvokaten er blevet indsat som kurator i virksomheden.'`
        }
    },
];

export default function ArticleScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={width * 0.08} color="black" />
                <Text style={styles.headerText}>Artikler</Text>
            </View>
            <Image source={articleData[0].article.coverImage} style={styles.cover} />
            <View style={styles.content}>
                <Text style={styles.articleTitle}>{articleData[0].article.title}</Text>
                <View style={styles.authorContainer}>
                    <Text>Af </Text>
                    <Text style={styles.authorName}>{articleData[0].author.name}</Text>
                </View>
                <Text style={styles.body}>{articleData[0].article.text}</Text>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        paddingTop: height * 0.02,
        paddingBottom: height * 0.05,
    },
    headerText: {
        marginLeft: width * 0.02,
        fontSize: width * 0.07,
        fontWeight: 'bold',
    },
    scrollView: {
        marginTop: height * 0.02,
    },
    cover: {
        width: '100%',
        height: height * 0.23,
        resizeMode: 'cover', 
    },
    content: {
        paddingHorizontal: width * 0.04,
    },
    articleTitle: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        paddingVertical: height * 0.02,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: height * 0.028,
    },
    authorName: {
        textDecorationLine: 'underline',
    },
    body: {
        fontSize: width * 0.04,
        lineHeight: height * 0.02,
    },
});