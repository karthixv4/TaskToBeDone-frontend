import React from 'react'
import { AlertTriangle, X , Info} from 'lucide-react'
import {signInErrorAlert, signUpErrorAlert, userExistsErrorAlert, logoutAlert} from '../store/atoms/userAtoms';
import {useRecoilState} from 'recoil';
export function Alerts() {

  const [signInError, setSignInError] = useRecoilState(signInErrorAlert);
  const [signUpError, setSignUpError] = useRecoilState(signUpErrorAlert);
  const [userExistsError, setUserExistsError] = useRecoilState(userExistsErrorAlert);
  const [logoutWarning, setLogoutWarning] = useRecoilState(logoutAlert);
  return (
    <>
    {signInError && <div className="rounded-md border-l-4 border-red-500 bg-red-100 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">
              Sign in failed, please try with valid credentials.
            </p>
          </div>
          <div>
            <X className="h-6 w-6 cursor-pointer text-red-600"
            onClick={()=>setSignInError(false)}
             />
          </div>
        </div>
      </div> }
      {signUpError && <div className="rounded-md border-l-4 border-red-500 bg-red-100 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">
              Sign up failed, please try with valid credentials.
            </p>
          </div>
          <div>
            <X className="h-6 w-6 cursor-pointer text-red-600"
            onClick={()=>setSignUpError(false)}
             />
          </div>
        </div>
      </div> }
      {userExistsError && <div className="rounded-md border-l-4 border-red-500 bg-red-100 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">
            A user already exists with this mail, please Sign In.
            </p>
          </div>
          <div>
            <X className="h-6 w-6 cursor-pointer text-red-600"
            onClick={()=>setUserExistsError(false)}
             />
          </div>
        </div>
      </div> }

      {logoutWarning && <div className="rounded-md border-l-4 border-black bg-gray-100 p-4">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <Info className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium">
            You have been successfully logged out!
          </p>
        </div>
        <div>
          <X className="h-6 w-6 cursor-pointer" 
          onClick={()=>setLogoutWarning(false)}
          />
        </div>
      </div>
    </div>}
    </>
  )
}
