import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";

import { 
    MainMenuContainer, 
    HolderContainer, 
    RecentList,
    RecentPanelContainer, 
    TitleButtonContainer, 
    Title, 
    RightIcon, 
    DefaultText,
    HomeImg, 
    ScrollContainer
} from './styles'

import Icon from '../../common/Icon'
import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors'

import DashboardHeader from '../../shared/DashboardHeader'
import DashboardChart from '../../shared/DashboardChart/DashboardChart'
import DashboardRecentPanel from '../../shared/DashboardRecentPanel/DashboardRecentPanel.js';
import CustomAlert from '../../shared/CustomAlert/CustomAlert.js';
import CustomLoader from '../../shared/CustomLoader/CustomLoader.js';

import useGetCollectionChartData from '../../../hooks/useGetCollectionChartData';
import useGetCollectionItems from '../../../hooks/useGetCollectionItems';
import useCollectionStore from '../../../hooks/useCollectionStore';

import LoaderStore from '../../../stores/LoaderStore.js';
import AlertStore from '../../../stores/AlertStore.js';

const MainMenuScreen = ({route}) => {
    const navigation = useNavigation();

    // State management for loading indicators
    const isLoading = LoaderStore(state => state.isLoading);
    const startLoading = LoaderStore((state) => state.startLoading);
    const stopLoading = LoaderStore((state) => state.stopLoading);

    // State management for alert components
    const isAlertVisible = AlertStore(state => state.isAlertVisible);
    const alertTitle = AlertStore(state => state.alertTitle);
    const alertMessage = AlertStore(state => state.alertMessage);
    const showAlert = AlertStore((state) => state.showAlert);
    const hideAlert = AlertStore((state) => state.hideAlert);

    // Handle close alert function
    const handleAlertClose = () => {
        stopLoading()
        hideAlert()
    }

    // Retrieve collection items, collection data, and chart data using custom hooks
    const collectionItems = useCollectionStore((state) => state.collectionItems);
    const [collectionData] = useGetCollectionItems();
    const chartData = useGetCollectionChartData();

    // State variables for state changes
    const isCollectionItemCreated = useCollectionStore(state => state.isCollectionItemCreated);
    const setCollectionItemCreated = useCollectionStore((state) => state.setCollectionItemCreated);

    // For reloading after making changes
    const key = route.params?.key || 'defaultKey';
    useEffect(() => {
        if(isCollectionItemCreated){
            setCollectionItemCreated(false)
        }
    }, [key]);
    
    return (
        <MainMenuContainer>
            <DashboardHeader
                title={'Home'}
            />
            <ScrollContainer>
                {
                    chartData.length ? (
                    <HolderContainer>
                        <DashboardChart title={"Collection Status"} chartData={chartData}/>
                    </HolderContainer>
                    ) : (
                        <HolderContainer>
                            <DefaultText>Start adding items to see graph</DefaultText>
                        </HolderContainer>
                    )
                }
                <TitleButtonContainer>
                    <Title>Recent Additions</Title>
                    <RightIcon onPress={() => 
                        navigation.navigate("Home", {
                            screen: "CollectionAdd"
                        })}>
                        <Icon 
                            name={ICON_NAMES.SYSTEM_ICONS.ADD}
                            color={colors.primary.colorOne}
                            size={32}
                        />
                    </RightIcon>
                </TitleButtonContainer>
                {collectionItems.length ? (
                    <RecentPanelContainer>
                        {collectionData.slice(0,12).map((item, index) => (
                             <DashboardRecentPanel data={item} key={index}/>
                        ))}
                    </RecentPanelContainer>
                ) : (
                    <DefaultText>You have no recent additions</DefaultText>
                )
                }
            </ScrollContainer>
            <CustomAlert 
                visible={isAlertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={handleAlertClose}
            />
            <CustomLoader visible={isLoading}/>
        </MainMenuContainer>
    )
    }

export default MainMenuScreen