import { Icon } from "@rneui/themed";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants";

const MoreOptions = ({
  menuVisible,
  hideMenu,
  menuPosition,
  deleteCamera,
  reconnectCamera,
}) => {
  return (
    <Modal visible={menuVisible} transparent={true} onRequestClose={hideMenu}>
      <TouchableWithoutFeedback onPress={hideMenu}>
        <View style={styles.modalContainer}>
          {/* Content of your menu */}
          <View
            style={[
              styles.menu,
              {
                top: menuPosition.y + 10,
                left: menuPosition.x - styles.menu.width,
              },
            ]}
          >
            <TouchableOpacity style={styles.option} onPress={reconnectCamera}>
              <Icon name="loop" size={20} color={COLORS.primaryColor} />
              <Text>Reconnect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Icon name="edit" size={20} color={COLORS.primaryColor} />
              <Text>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={deleteCamera}>
              <Icon name="delete-outline" size={20} color={COLORS.danger} />
              <Text style={{ color: COLORS.danger }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MoreOptions;

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  // Your existing styles...

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-end",
  },

  menu: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 150,
  },
});
