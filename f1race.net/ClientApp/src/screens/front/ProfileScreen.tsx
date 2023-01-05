// Profile.jsx

import React from "react";
import SingleColumnLayout from "../../components/SingleColumnLayout";
import {useAppSelector} from "../../hooks/hooks";

const ProfileScreen = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <SingleColumnLayout>
      <div className="-mx-6 sm:mx-0">
        <div className="mx-auto flex w-full flex-col sm:max-w-xl">
          {user && (
            <>
              <figure>{user.nickname.charAt(0).toUpperCase()}</figure>
              <span>
                Welcome <strong>{user.nickname}!</strong> You can view this page
                because you're logged in
              </span>
            </>
          )}
        </div>
      </div>
    </SingleColumnLayout>
  );
};

export default ProfileScreen;
