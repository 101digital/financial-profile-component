// FinancialContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FinancialService } from '../services/FinancialService';
import { useAuth } from 'react-native-auth-component';

// Define the context value type for Financial-related functions
interface FinancialContextType {
  fetchFinancialProfile: (userId: string) => void;
  financialProfileDetails: any;
}

// Create the Financial context
const FinancialContext = createContext<FinancialContextType | undefined>(undefined);
const financialService = FinancialService.instance()

export const FinanceProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [financialProfileDetails, setFinancialProfileDetails] = useState<any>(null);

  const fetchFinancialProfile = async (userId) => {
    try {
      // Call the financial service to get financial details with pagination parameters
      const response = await financialService.getFinancialProfile(userId);

      // Check if the response contains data
      if (response.data && response.data.length > 0) {
        // Set the financialDetails state
        setFinancialProfileDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching financial details:', error);
    }
  };

  useEffect(() => {
    // Fetch the initial page of financial details
    // if (user) {
    //   fetchFinancialProfile(userId);
    // }

  }, []);

  return (
    <FinancialContext.Provider value={{ financialProfileDetails }}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
