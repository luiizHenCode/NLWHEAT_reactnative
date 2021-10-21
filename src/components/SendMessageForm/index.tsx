import React, { useState } from "react";
import {
  Keyboard,
  TextInput,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { styles } from "./styles";

import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setSendingMessage(true);

      await api.post("/messages", { message: messageFormatted });
      setMessage("");
      Keyboard.dismiss();
      ToastAndroid.show("Mensagem enviada", 200);
      setSendingMessage(false);
    } else {
      ToastAndroid.show("Escreva a mensagem para enviar", 200);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TextInput
          keyboardAppearance="dark"
          placeholder="Qual sua expectativa para o evento?"
          multiline
          maxLength={140}
          placeholderTextColor={COLORS.GRAY_PRIMARY}
          onChangeText={setMessage}
          value={message}
          style={styles.input}
          editable={!sendingMessage}
        />

        <Button
          title="ENVIAR MENSAGEM"
          backgroundColor={COLORS.PINK}
          color={COLORS.WHITE}
          isLoading={sendingMessage}
          onPress={handleMessageSubmit}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
