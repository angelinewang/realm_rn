import { SafeAreaView } from "react-native-safe-area-context";
import { IProps } from "../../auth-app";

const MainContainer: React.FC<IProps> = ({ children }) => {
    return (
        <SafeAreaView>
            {children}
        </SafeAreaView>
    )
}

export default MainContainer;