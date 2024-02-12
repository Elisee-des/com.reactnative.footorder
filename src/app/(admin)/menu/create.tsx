import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { Stack, useLocalSearchParams } from "expo-router";
import { defaultPizzaImage } from "@/types";
import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetField = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Le nom est requis.");
      return false;
    }

    if (!price) {
      setErrors("Le prix est requis.");
      return false;
    }

    if (!price) {
      setErrors("Le prix est requis.");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors("Le prix dois être un nombre.");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    resetField();
    console.warn("Produit cré avec succès !!!");
  };

  const onUpdateCreate = () => {
    if (!validateInput()) {
      return;
    }

    resetField();
    console.warn("Produit edité avec succès !!!");
  };

  const onSubmit = () => {
    if (isUpdating) {
      //on met a jour
      onUpdateCreate();
    } else {
      //on creer
      onCreate();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? `Edition du produit` : "Creation d'un produit",
        }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.textButton}>Selectionner une Image</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      {errors && <Text style={{ color: "red" }}>{errors}</Text>}
      <Button
        onPress={onSubmit}
        text={isUpdating ? "Edition du produit" : "Creér le produit"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});

export default CreateProductScreen;
