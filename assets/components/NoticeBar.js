import React, { useRef, useEffect } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';

const NoticeBar = () => {
  const notices = ['Notice 5', 'Notice 2', 'Notice 3', 'Notice 4', 'Notice 5'];

  const scrollX = useRef(new Animated.Value(0)).current;
  const noticeWidth = 900; // Set the width of each notice item

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(scrollX, {
        toValue: scrollX._value + noticeWidth,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        scrollX.setValue(0); // Reset scroll position to show the next notice
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.notceBox}>
          <Text style={styles.boxText}>Notice: </Text>
        </View>
        <Animated.View
          style={[
            styles.noticeContainer,
            {
              transform: [
                {
                  translateY: Animated.modulo(
                    scrollX,
                    noticeWidth * notices.length
                  ),
                },
              ],
            },
          ]}
        >
          {notices.map((notice, index) => (
            <View key={index} style={styles.noticeItem}>
              <Text style={styles.noticeText}>{notice}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  notceBox: {
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    padding: 5,
    overflow: 'hidden',
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticeItem: {
    width: 300, // Set the width of each notice item
    justifyContent: 'center',
  },
  noticeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
  },
});

export default NoticeBar;
