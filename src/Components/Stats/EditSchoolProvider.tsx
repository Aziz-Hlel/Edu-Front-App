import { SchoolsInfoContextProvider } from "../../useContext/SchoolsInfoContext";





const EditSchoolProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <SchoolsInfoContextProvider>

                {children}
            </SchoolsInfoContextProvider>
        </>
    )
}

export default EditSchoolProvider;