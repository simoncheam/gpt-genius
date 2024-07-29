import { UserButton } from '@clerk/nextjs';

const MemberProfile = () => {
  return (
    <div className='px-4 flex items-center gap-2'>
      <UserButton afterSwitchSessionUrl='/' afterSignOutUrl='/' />
      MemberProfile
    </div>
  );
};
export default MemberProfile;
