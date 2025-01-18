import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const MenuOption = ({
  onSelect,
  children,
}: {
  onSelect: () => void;
  children: ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.menuOption}>
      {children}
    </TouchableOpacity>
  );
};

interface DropdownMenuProps {
  isVisible: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  dropdownWidth?: number;
  xPos?: number;
  yPos?: number;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isVisible,
  handleOpen,
  handleClose,
  trigger,
  children,
  dropdownWidth = 150,
  xPos = 60,
  yPos = 5,
}) => {
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

  useEffect(() => {
    if (triggerRef.current && isVisible) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px - xPos,
          y: py + height + yPos,
          width: width,
        });
      });
    }
  }, [isVisible]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {isVisible && (
        <Modal
          transparent={true}
          visible={isVisible}
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.menu,
                  {
                    top: position.y,
                    left: position.x + position.width / 2 - dropdownWidth / 2,
                    width: dropdownWidth,
                  },
                ]}
              >
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  menu: {
    position: "absolute",
    width: 80,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuOption: {
    padding: 5,
  },
});
