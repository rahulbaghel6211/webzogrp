import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

function HomeScreen() {
  const [emailData, setEmailData] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2Vycm9oaXRuZXcxNEB3ZXpib21haWwuY29tIiwicGFzc3dvcmQiOiJUZXN0QDEyMyIsImlhdCI6MTY5NzUzMzE5MH0.W_OoHA3E4hcNTyU72EVpAsP0Kf04GiJwcnrL4zBJS_k'; // Replace with your actual token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ap-south.mail.api.wezbogroup.com/mail/INBOX/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log("response",response.data.emails)
        if (response.status === 200) {
          setEmailData(response.data.emails);
        }
      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const renderEmailItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>Subject: {item.subject}</Text>
        <Text>From: {item.from.text}</Text>
        <Text>To: {item.to.text}</Text>
        <Text>Date: {item.date}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
        Email Viewer
      </Text>
      <FlatList
        data={emailData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderEmailItem}
      />
    </View>
  );
}

export default HomeScreen;
