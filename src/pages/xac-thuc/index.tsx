import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

enum Result_Type {
  LOADING = 0,
  SUCCESS = 1,
  FAILED = 2,
}

const VerifyEmailToken = () => {
  //   const router = useRouter();
  const [result, setResult] = React.useState<Result_Type>(Result_Type.LOADING);
  //   const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    // (async () => {
    //   // const res = await verifyEmailApi({ token: params.get('token') });
    //   // if (res.code === 200) setResult(true);
    //   // setLoading(false);
    //   console.log('verified', params.get('token'));
    // })();
    const timeout = setTimeout(() => {
      setResult(Result_Type.FAILED);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <React.Fragment>
      {/* <LayoutCommon title="Xác thực tài khoản" isVisibleFooter={false}> */}
      <Head>
        <title>Xác thực tài khoản</title>
      </Head>
      <div className="w-full min-h-[100vh] px-[50px] flex justify-center items-center">
        <div className="min-w-[40%] min-h-[300px]">
          <div className="p-[30px] w-full">
            {result === Result_Type.LOADING && (
              <h1 className="text-center text-[18px]">Đang xác thực ...</h1>
            )}
            {result === Result_Type.SUCCESS && (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={'/icons/ic_success_check.png'}
                  alt=""
                  width={30}
                  height={30}
                />
                <p className="my-[30px] text-[18px]">
                  Tài khoản của bạn đã được xác thực, hãy đăng nhập để tiếp tục.
                </p>
                <Link href={'/dang-nhap'}>
                  <a type="button" className="button-primary">
                    Đăng nhập
                  </a>
                </Link>
              </div>
            )}
            {result === Result_Type.FAILED && (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={'/icons/ic_failed_cross.png'}
                  alt=""
                  width={30}
                  height={30}
                />
                <p className="my-[30px] text-[18px] text-center">
                  Email đã xác nhận không thành công, có lỗi xảy ra. Vui lòng
                  liên hệ với chúng tôi để được tư vấn qua email{' '}
                  <strong>weetahousing2022@gmail.com</strong>
                </p>
                <Link href={'/'}>
                  <a type="button" className="button-outline-primary">
                    Trở về trang chủ
                  </a>
                </Link>
                {/* <button className="button-primary">Trở về trang chủ</button> */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </LayoutCommon> */}
    </React.Fragment>
  );
};

export default VerifyEmailToken;
