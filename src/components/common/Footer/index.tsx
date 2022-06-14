import Link from 'next/link';
import LineHorizontal from '../LineHorizontal';

const FooterIcons = [
  '/images/img_banner_vnpay.png',
  '/images/img_banner_momo.png',
  '/icons/ic_facebook_footer.png',
  '/icons/ic_google.png',
];

const Footer = () => {
  return (
    <footer className="w-full bg-white-100">
      <div className="container_app px-[50px] pt-[70px] pb-[35px] mx-auto">
        <div className="w-full grid grid-cols-3 mb-[70px]">
          <div className="w-full">
            <p className="font-semibold text-grey-400 text-18px">Dịch vụ</p>
            <div className="w-full grid grid-cols-1 gap-y-[15px] mt-[25px]">
              <div>
                <Link href="#!">
                  <a className="category-link">Nhà trọ</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Dãy trọ</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Chung cư</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Trọ sinh viên</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Trọ cho công nhân</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="font-semibold text-grey-400 text-18px">Giới thiệu</p>
            <div className="w-full grid grid-cols-1 gap-y-[15px] mt-[25px]">
              <div>
                <Link href="#!">
                  <a className="category-link">Giới thiệu về chúng tôi</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Phương thức hoạt động</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Bảo mật</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Nhà đầu tư</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Tin tức</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="font-semibold text-grey-400 text-18px">Điều khoản</p>
            <div className="w-full grid grid-cols-1 gap-y-[15px] mt-[25px]">
              <div>
                <Link href="#!">
                  <a className="category-link">Chính sách riêng tư</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Điều khoản và điều kiện</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Chính sách bản quyền</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Quy tắc ứng xử</a>
                </Link>
              </div>
              <div>
                <Link href="#!">
                  <a className="category-link">Phí và chi phí</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <LineHorizontal className="mb-[30px] bg-grey-200" />
        <div className="w-full flex justify-between">
          <div className="flex items-end">
            <Link href="/">
              <a className="font-bold text-[32px] md:text-[24px] text-baseColor">
                WEETA HOUSING
              </a>
            </Link>
            <p className="text-16px text-black-300 pb-[8px] ml-[70px]">
              Privacy Policy | Terms of Service
            </p>
            <p className="text-16px text-black-300 pb-[8px] ml-[70px]">
              © Weeta Housing 2022
            </p>
          </div>
          <div className="flex items-end">
            {FooterIcons.map((item, i) => (
              <div key={i}>
                <Link href="#!">
                  <a className="hover_icon ml-[25px]">
                    <span className="icon">
                      <img
                        src={item}
                        className="w-[27px] h-[27px] object-cover"
                        alt="icon"
                      />
                      {/* <Image
                        src={item}
                        alt="icon"
                        objectFit="cover"
                        width={27}
                        height={27}
                      /> */}
                    </span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
