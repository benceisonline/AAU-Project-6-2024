import React from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { layout } from '../GlobalStyles';
import NewsCard from '../components/NewsCard';
import NewsHeader from '../components/NewsHeader';
import Error from '../components/Error';

// mock data
const newsData = [
  {
    news: {
      newsId: 1,
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      journalistName: 'Lasse Claes',
      coverImage: 'https://via.placeholder.com/150',
      category: 'Opinion',
      timestamp: '34m',
      breaking: false,
      body: `'Kære Familie. I morgen, når fløjten lyder for sidste gang, er kampen slut for mig, og min tid i Altan.dk er forbi'. Sådan indleder den administrerende direktør i Danmarks største altanvirksomhed, Altan.dk, Casper Knudsen, i en mail, der er sendt ud til sine medarbejdere, som Ekstra Bladet er i besiddelse af.
      Til Ekstra Bladet bekræfter virksomhedens presseansvarlige, Morten Huse Eikrem-Jeppesen, at selskabet i dag 29. august er taget under konkursbehandling.
      'Altan.dk er i dag 29. august blevet taget under konkursbehandling på baggrund af en begæring indgivet af Gældsstyrelsen.'
      'Umiddelbart efter at selskabet modtog konkursbegæringen, har selskabet med bistand fra selskabets revision og med juridisk bistand indledt et udredningsarbejde.'
      'Mens udredningsarbejdet har stået på, har det været forsøgt at sikre den fortsatte drift ved at undersøge mulighederne for at tilføre Altan.dk mere kapital og/eller et helt eller delvist salg af virksomheden. Dette har ikke været muligt,' skriver Altan.dk til Ekstra Bladet.
      Ifølge Ekstra Bladets oplysninger har Gældsstyrelsen gjort krav på et stort millionbeløb.
      Medarbejder bortvist og politianmeldt
      Altan.dk oplyser til Ekstra Bladet, at en ledende medarbejder i forbindelse med udredningen af virksomheden er blevet politianmeldt, fordi der er fundet uregelmæssigheder i selskabets bogholderi.
      'Også på den baggrund måtte det konstateres, at det ikke har været muligt at fortsætte virksomhedens drift.'
      'Udredningsarbejdet har endvidere medført, at ledelsen har bortvist og politianmeldt en ledende medarbejder i selskabets økonomifunktion,' oplyser virksomheden til Ekstra Bladet.
      Ifølge virksomhedens seneste regnskab havde de 108 medarbejdere ansat. Selskabet har også ifølge seneste regnskab en egenkapital på 33 mio. kr., men alligevel har Altan.dk ikke været i stand til at betale det beløb, som Gældsstyrelsen kræver. Både selskabets direktør Casper Gorm Knudsen og virksomhedens bestyrelsesformand Allan Søgaard Larsen afviser at stille op til interview, men henviser til kurator, der fortsat er i gang med at danne sig et overblik over sagen. Cathrine Wollenberg Zittan fra Kammeradvokaten er blevet indsat som kurator i virksomheden.'`,
    }
  },
  {
    news: {
      newsId: 2,
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      journalistName: 'Lasse Claes',
      coverImage: 'https://via.placeholder.com/150',
      category: 'Opinion',
      timestamp: '34m',
      breaking: false,
      body: '',
    }
  },
  {
    news: {
      newsId: 3,
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      journalistName: 'Lasse Claes',
      coverImage: 'https://via.placeholder.com/150',
      category: 'Opinion',
      timestamp: '34m',
      breaking: true,
      body: '',
    }
  },
  {
    news: {
      newsId: 4,
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      journalistName: 'Lasse Claes',
      coverImage: 'https://via.placeholder.com/150',
      category: 'Opinion',
      timestamp: '34m',
      breaking: false,
      body: '',
    }
  },
];

export default function NewsFeedScreen() {
  
  const onPressedSubView = (id) => {
    switch (id) {
      case 1:
        // Handle case 1
        console.log("Case 1 is triggered");
        break;
      case 2:
        // Handle case 2
        console.log("Case 2 is triggered");
        break;
      case 3:
        // Handle case 3
        console.log("Case 3 is triggered");
        break;
      default:
        // Handle default case
        console.log("Default case is triggered");
        break;
    }
  };

  if (newsData.length === 0) {
		return(
			<Error errorText={'Aktiklerne blev ikke fundet'} />
		);
	}

  return (
    <SafeAreaView style={ styles.container } >
      <NewsHeader onPressedSubView={onPressedSubView} />
      <ScrollView 
        style={ styles.feed } 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        {newsData.map((item) => (
          <NewsCard key={item.news.newsId} news={item.news} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FCFCFC',
    ...layout.flexColumn
  },
  feed: {
    marginHorizontal: '2.5%'
  }
});