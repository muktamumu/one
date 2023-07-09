import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';

const NoticeBar = () => {
  const data = [
    { id: 1, text: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
    { id: 2, text: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB' },
    { id: 3, text: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC' },
    // Add more notices here
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scrollLength = data.length * 200; // Adjust the scroll length based on your notice width
    const animation = Animated.timing(scrollX, {
      toValue: scrollLength,
      duration: scrollLength * 30, // Adjust the duration for scrolling speed
      useNativeDriver: true,
    });

    const startAnimation = () => {
      scrollX.setValue(0);
      animation.start(() => {
        startAnimation();
      });
    };

    startAnimation();
  }, []);

  return (
    <View style={{ height: 20 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        <Animated.View
          style={{
            flexDirection: 'row',
            transform: [{ translateY: scrollX }],
          }}
        >
          {data.map((item) => (
            <View
              key={item.id}
              style={{ width: 200, marginRight: 10 }} // Adjust the width and margin based on your notice styling
            >
              <Text style={{ fontSize: 16 }}>{item.text}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default NoticeBar;
