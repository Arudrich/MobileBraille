import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const FilterModal = ({ visible, onClose, filters, selectedFilters, onSelectFilter, applyFilters }) => {
  const handleChipPress = (filter) => {
    onSelectFilter(filter);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalBackdrop}
        onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalButton,
                  selectedFilters.includes(filter) && styles.selectedChip,
                ]}
                onPress={() => handleChipPress(filter)}>
                <Text style={styles.modalButtonText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedChip: {
    backgroundColor: '#062CD4', // Change this to your desired selected color
  },
  applyButton: {
    backgroundColor: '#062CD4',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FilterModal;
