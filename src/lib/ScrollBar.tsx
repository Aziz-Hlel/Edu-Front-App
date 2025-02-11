

const getScroolBar = () => {


    return `
       overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full  
       [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full
       [&::-webkit-scrollbar-thumb]:bg-gray-600 
  `;
}


export default getScroolBar;