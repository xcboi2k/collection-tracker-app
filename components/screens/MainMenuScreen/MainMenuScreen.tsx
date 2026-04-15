import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { NumericFormat } from 'react-number-format';

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
    ScrollContainer,
    RowHolderContainer,
    StatsTitleText,
    StatsBodyText,
    StatsPanelContainer
} from './styles'

import Icon from '../../common/Icon'
import { ICON_NAMES } from '../../../constants/constant'
import colors from '../../../assets/themes/colors'
import { db } from '../../../firebase.js';

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

const MainMenuScreen = () => {
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

    const chartData = useGetCollectionChartData();

    // For reloading after making changes
    const [collectionData, setCollectionData] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [averageValue, setAverageValue] = useState(0);
    const [mostExpensive, setMostExpensive] = useState(null);
    const [leastExpensive, setLeastExpensive] = useState(null);
    const [frequentCategory, setFrequentCategory] = useState('');
    const [loading, setLoading] = useState(false)
    const fetchCollection = async () => {
        setLoading(true)
        const collectionColRef = collection(db, "collection");
        const collectionQuery = query(collectionColRef, orderBy("created_at", "desc"));

        const unsubscribe = onSnapshot(collectionQuery, (snapshotData) => {
            const userList = [];

            snapshotData.forEach((doc) => {
                userList.push({
                    ...doc.data(),
                    id: doc.id
                });
                // console.log("CATEGORY PUSHED", doc.id);
            });
            if(userList.length > 0){
                setCollectionData(userList);
                setLoading(false)
            }
        });

        return unsubscribe;
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Mount Main Menu');
            fetchCollection()
            
            return () => {
                console.log('Unmount Main Menu');
            };
        }, [])
    );

    console.log(collectionData)

    useEffect(() => {
        if(collectionData.length > 0){
            // Total Value and Average Value
            const totalAmount = collectionData.reduce((total, item) => total + item.collectionItem_amount, 0);
            const averageAmount = totalAmount / collectionData.length;
            // Most Expensive Item
            const mostExpensiveItem = collectionData.reduce((max, item) => max.collectionItem_amount > item.collectionItem_amount ? max : item, collectionData[0]);

            // Least Expensive Item
            const leastExpensiveItem = collectionData.reduce((min, item) => min.collectionItem_amount < item.collectionItem_amount ? min : item, collectionData[0]);

            // Most Frequent Category
            const categoryCount = collectionData.reduce((acc, item) => {
                acc[item.category_name] = (acc[item.category_name] || 0) + 1;
                return acc;
            }, {});
            const mostFrequentCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b);

            setTotalValue(totalAmount)
            setAverageValue(averageAmount)
            setMostExpensive(mostExpensiveItem)
            setLeastExpensive(leastExpensiveItem)
            setFrequentCategory(mostFrequentCategory)
        }
    }, [collectionData])
    
    
    return (
        <MainMenuContainer>
            <DashboardHeader
                title={'Home'}
            />
            <ScrollContainer>
                {
                    loading ? (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                            <ActivityIndicator size="large" color={colors.primary.colorOne}/>
                        </View>
                    ) : (
                        <>
                            {
                                chartData.length ? (
                                    <HolderContainer>
                                        <DashboardChart title={"Collection Status"} chartData={chartData}/>
                                        <HolderContainer>
                                            <StatsPanelContainer width='100%'>
                                                <StatsTitleText>Total Value of Collection</StatsTitleText>
                                                <StatsBodyText size='30px'>
                                                    <NumericFormat
                                                        value={totalValue}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'₱ '}
                                                        decimalScale={2}
                                                        renderText={value => <Text>{value}</Text>}
                                                    />
                                                </StatsBodyText>
                                            </StatsPanelContainer>
                                        </HolderContainer>
                                        <RowHolderContainer>
                                            <StatsPanelContainer width='48%'>
                                                <StatsTitleText>Total Items</StatsTitleText>
                                                <StatsBodyText>{collectionData.length}</StatsBodyText>
                                            </StatsPanelContainer>
                                            <StatsPanelContainer width='48%'>
                                                <StatsTitleText>Average Value of Collection</StatsTitleText>
                                                <StatsBodyText>
                                                    <NumericFormat
                                                        value={averageValue}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'₱ '}
                                                        decimalScale={2}
                                                        renderText={value => <Text>{value}</Text>}
                                                    />
                                                </StatsBodyText>
                                            </StatsPanelContainer>
                                        </RowHolderContainer>
                                        <RowHolderContainer>
                                            <StatsPanelContainer width='48%'>
                                                <StatsTitleText>Most Expensive Item</StatsTitleText>
                                                <StatsBodyText size='15px'>{mostExpensive.collectionItem_name}</StatsBodyText>
                                            </StatsPanelContainer>
                                            <StatsPanelContainer width='48%'>
                                                <StatsTitleText>Least Expensive Item</StatsTitleText>
                                                <StatsBodyText size='15px'>{leastExpensive.collectionItem_name}</StatsBodyText>
                                            </StatsPanelContainer>
                                        </RowHolderContainer>
                                        <HolderContainer>
                                            <StatsPanelContainer width='100%'>
                                                <StatsTitleText>Most Frequent Category</StatsTitleText>
                                                <StatsBodyText size='30px'>{frequentCategory}</StatsBodyText>
                                            </StatsPanelContainer>
                                        </HolderContainer>
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
                            {
                                collectionData.length ? (
                                    <RecentPanelContainer>
                                        {collectionData.slice(0,12).map((item, index) => (
                                                <DashboardRecentPanel data={item} key={index}/>
                                        ))}
                                    </RecentPanelContainer>
                                ) : (
                                    <DefaultText>You have no recent additions</DefaultText>
                                )
                            }
                        </>
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