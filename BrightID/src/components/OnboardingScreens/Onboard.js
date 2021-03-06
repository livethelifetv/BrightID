// @flow

import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { withTranslation } from 'react-i18next';
import MaintainPrivacy from './onboardingCards/MaintainPrivacy';
import BrightIdOnboard from './onboardingCards/BrightIdOnboard';

/* Description */
/* ======================================== */

/**
 * Initial Onboarding screen of BrightID
 * Uses react-native-snap-carousel for displaying onboarding cards
 */

type State = {
  activeSlide: number,
  entries: number[],
};

/* Constants */
/* ======================================== */

const winWidth = Dimensions.get('window').width;
const statusBarHeight = getStatusBarHeight();

/* Onboarding Screen */
/* ======================================== */

export class Onboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeSlide: 0,
      entries: [...Array(2)],
    };
  }

  renderItem = ({ index }: { index: number }) => {
    switch (index) {
      case 0:
        return (
          <View key={index} style={styles.onboardingCards}>
            <BrightIdOnboard />
          </View>
        );
      case 1:
        return (
          <View key={index} style={styles.onboardingCards}>
            <MaintainPrivacy />
          </View>
        );
      default:
    }
  };
  // slide item

  render() {
    const { activeSlide, entries } = this.state;
    const { t } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          animated={true}
        />
        <View style={styles.carousel} testID="Carousel">
          <Carousel
            data={entries}
            renderItem={this.renderItem}
            layout="default"
            autoplay={true}
            sliderWidth={winWidth}
            itemWidth={winWidth - 40}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
        </View>
        <View style={styles.center}>
          <Pagination
            dotsLength={entries.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.pagination}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          />
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            testID="getStartedBtn"
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{t('onboarding.button.getStarted')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  carousel: {
    flex: 3.5,
    marginTop: statusBarHeight,
  },
  onboardingCards: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pagination: {},
  button: {
    width: 300,
    borderWidth: 1,
    borderColor: '#4990e2',
    paddingTop: 13,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'ApexNew-Medium',
    color: '#4990e2',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#333',
  },
});

export default withTranslation()(Onboard);
