import { getClientCookie } from "@/helper/client-cookie";

export type CreatePollPayload = {
  question: string;
  options: string[];
};

export type CreatePollResponse = {
  id: number;
  question: string;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
  createdById: number;
  options: Array<{
    id: number;
    text: string;
    pollId: number;
    votes: any[];
  }>;
};

export const createPoll = async (payload: CreatePollPayload): Promise<CreatePollResponse> => {
  console.log('🔗 STEP 1: API function called');
  
  const token = getClientCookie("access_token");
  console.log(token)
  
  console.log('🔑 STEP 2: Token from client cookies:', token);
  console.log('🔑 STEP 2.1: Token exists:', !!token);

  if (!token) {
    console.log('❌ STEP 3: No token - throwing error');
    throw new Error("Please login first to create a survey");
  }

  console.log('✅ STEP 4: Token is valid, proceeding to fetch');

  try {
    console.log('🔄 STEP 5: Starting fetch request...');
    console.log('📦 Payload being sent:', payload);
    
    const response = await fetch("http://localhost:3000/polls", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    console.log('📡 STEP 6: Fetch completed, status:', response.status);

    if (!response.ok) {
      console.log('❌ STEP 7: Response not OK');
      const errorText = await response.text();
      console.log('❌ STEP 7.1: Error text:', errorText);
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    console.log('✅ STEP 8: Response OK, parsing JSON...');
    const result = await response.json();
    console.log('🎉 STEP 9: Success! Result:', result);
    return result;

  } catch (error) {
    console.error('💥 STEP 10: Catch block - Error:', error);
    console.error('💥 Error type:', error?.constructor?.name);
    throw error;
  }
};