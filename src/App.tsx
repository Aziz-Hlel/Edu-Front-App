import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './index.css'
import Sidebar from './Components/SideBar/Sidebar';
import MainTable from './Components/MainTable/MainTable';
import ErrorConComponent from './lib/ErrorConComponent';
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import Search from './Components/Search/Search';
import LevelComp from './Components/LevelComp/LevelComp';
import { MainTableSVG, SmartExcelSVG, StatsSVG, historique_iconSVG, roman_1SVG, roman_2SVG, roman_3SVG, roman_4SVG, roman_5SVG, roman_6SVG, searchSVG, searchTransferSVG } from './lib/Svgs';
import EditSchoolNumbers from "./Components/LevelComp/Components/EditSchoolNumbers";
import Historique from './Components/Historique/Historique';
import { AuthProvider } from './useContext/AuthContext';
import PrivateRoute from './PrivateRoute';
import ExcelParentContextProvider from './Components/Excel/ExcelParentContextProvider';
import Stats from './Components/Stats/Stats';
import EditSchool from './Components/Stats/EditSchool';
import Login from './Components/Logins2';
import axios from 'axios';
import getUrl from './useContext/getUrl';
import SearchTransfers from './Components/SearchTransfers/SearchTransfers';

import 'react-toastify/dist/ReactToastify.css?inline';
import { toast } from 'sonner';


declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}


export type pageProp = {
  name: string;
  path: string;
  element: JSX.Element;
  icon: ({ active }: { active: boolean; }) => JSX.Element;
}

export const pages: pageProp[] = [
  {
    name: "احصائيّات",
    path: '/',
    element: <Stats />,
    icon: StatsSVG
  },
  {
    name: "احصاء جميع المدارس",
    path: '/maintable',
    element: <MainTable />,
    icon: MainTableSVG
  },
  {
    name: "حركة السنوات الأولى",
    path: '/level/premiere',
    element: <LevelComp />,
    icon: roman_1SVG
  },
  {
    name: "حركة السنوات الثانية",
    path: '/level/deuxieme',
    element: <LevelComp />,
    icon: roman_2SVG
  },
  {
    name: "حركة السنوات الثالثة",
    path: '/level/troisieme',
    element: <LevelComp />,
    icon: roman_3SVG
  },
  {
    name: "حركة السنوات الرابعة",
    path: '/level/quatrieme',
    element: <LevelComp />,
    icon: roman_4SVG
  },
  {
    name: "حركة السنوات الخامسة",
    path: '/level/cinquieme',
    element: <LevelComp />,
    icon: roman_5SVG
  },
  {
    name: "حركة السنوات السادسة",
    path: '/level/sixieme',
    element: <LevelComp />,
    icon: roman_6SVG
  },
  {
    name: "تحويل تلميذ",
    path: '/SmartExcel',
    element: <></>,
    icon: SmartExcelSVG
  },
  {
    name: "البحث عن تلميذ",
    path: '/search',
    element: <Search />,
    icon: searchSVG
  },
  {
    name: " البحث عن تلميذ متحوّل",
    path: '/searchtransfers',
    element: <SearchTransfers />,
    icon: searchTransferSVG
  },
  {
    name: "اللأرشيف",
    path: '/historique',
    element: <Historique />,
    icon: historique_iconSVG
  },


]


export type ParamsProp = {
  sid: number,
  school_name: string,
  saisieprenom: string,
  saisienom: string,
  saisiepasswd: string,
  login: string,
  mp: string,
  ecole_url: string,

}


export type LevelArray = {
  nbr_elvs: number,
  nbr_classes: number,
  nbr_leaving: number,
  nbr_comming: number
};


export type School = {
  name: string;
  principal: string;
  premiere: LevelArray;
  deuxieme: LevelArray;
  troisieme: LevelArray;
  quatrieme: LevelArray;
  cinquieme: LevelArray;
  sixieme: LevelArray;

};

export type CityData = {
  [del1_id: number]: {
    name: string;
    ecoles: {
      [sid: number]: School;
    };
  };
};


export type LevelProp = "premiere" | "deuxieme" | "troisieme" | "quatrieme" | "cinquieme" | "sixieme";
const levels = ["premiere", "deuxieme", "troisieme", "quatrieme", "cinquieme", "sixieme"]

levels
export const ParamsContext = createContext<ParamsProp>({ sid: 0, school_name: "", saisieprenom: "", saisienom: "", login: "", saisiepasswd: "", mp: '', ecole_url: "" })
export const SwitchContext = createContext<Function>(() => { })
export const transferElvContext = createContext<Function>(() => { })

export const cityIdContext = createContext<number>(0)


function App() {

  const [ServerIsWorkin, SetServer] = useState(true);
  const testSignal = async () => {
    try {
      const resp = await axios.get(getUrl() + "x/testSignal/")
      console.log(resp.data)
      SetServer(resp.data)

    }
    catch (error) {
      SetServer(false)
    }
  }

  testSignal()
  toast('Hello World', {
    unstyled: true,
    classNames: {
      toast: 'bg-blue-400',
      title: 'text-red-400 text-2xl',
      description: 'text-red-400',
      actionButton: 'bg-zinc-400',
      cancelButton: 'bg-orange-400',
      closeButton: 'bg-lime-400',
    },
  });
  return (
    <>
      <div className='h-screen w-full  flex bg-slate-300  transform  origin-top-left' dir="rtl">

        <Router>

          <Sidebar />

          <AuthProvider>




            <Routes >

              <Route path="/login" element={<Login />} />

              <Route element={<PrivateRoute />}>

                <Route path="/" element={<Stats />} >
                  <Route path="edit/:sid" element={<EditSchool />} />
                </Route>

                <Route path="/maintable" element={<MainTable />} />

                <Route path='level/:level' element={<LevelComp />} >
                  <Route path='edit/:sid' element={<EditSchoolNumbers />} />
                </Route>

                <Route path="/SmartExcel" element={<ExcelParentContextProvider />} />
                <Route path="/search" element={<Search />} />
                <Route path="/searchtransfers" element={<SearchTransfers />} />

                <Route path="/historique" element={<Historique />} />


              </Route>

            </Routes>



          </AuthProvider>
        </Router>


      </div >
      {!ServerIsWorkin && <ErrorConComponent />}
    </>
  )

}



export default App;

{/* <SwitchContext.Provider value={swwitch}>

{Logins_isVisible && <Logins2 />}

</SwitchContext.Provider> */}


// zid 7ot l server error f kol w7da o5rin tb3th fihom requette 