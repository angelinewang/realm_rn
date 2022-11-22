import { SafeAreaView } from "react-native-safe-area-context";
import { IProps } from "../../auth-app";

const MainContainer: React.FC<IProps> = ({ children }) => {
    return (
        <SafeAreaView className="flex-1 p-[20px] bg-[#201520]">
            {children}
        </SafeAreaView>
    )
}

export default MainContainer;