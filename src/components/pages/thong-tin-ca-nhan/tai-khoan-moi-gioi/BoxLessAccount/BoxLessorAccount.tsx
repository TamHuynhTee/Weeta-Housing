import { useAuth } from '@/stores/Auth';

const BoxLessorAccount = () => {
  const [stateAuth] = useAuth();

  console.log('stateAuth', stateAuth.auth);
  const data = stateAuth.auth;

  return (
    <div className="container_shadow">
      <p className="text-black-100 text-[24px] font-bold">Tài khoản môi giới</p>
      <div className="mt-[20px]">
        {!data?.isAutoApproved ? (
          <div className="bg-bg-warning text-text-warning p-[10px]">
            Hãy xác thực <span className="font-bold">CMND</span> để tin đăng
            không phải chờ duyệt.
          </div>
        ) : (
          <div className="bg-green-100 text-green-500 p-[10px]">
            Tài khoản của bạn đã được xác thực{' '}
            <span className="font-bold">CMND</span>.
          </div>
        )}
      </div>
      <div className="mt-[20px]"></div>
    </div>
  );
};

export default BoxLessorAccount;
