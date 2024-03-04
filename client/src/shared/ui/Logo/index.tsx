import React from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import classes from './Logo.module.sass'

interface IProps {
  isMobile: boolean
  pathname: string
  isAuth: boolean
}

const Logo: React.FC<IProps> = React.memo(({ isMobile, pathname, isAuth }) => {
  return (
    <NavLink
      to="/"
      className={cn(classes.link, {
        [classes.mr_auto]: (isMobile && !isAuth) || pathname !== '/',
        [classes.auth]: isMobile && isAuth && (pathname === '/' || pathname.includes('/reviews/')),
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="35"
        viewBox="0 0 38 35"
        fill="none"
      >
        <path
          d="M18.5127 0.3894C18.4895 0.427086 17.6691 1.74031 16.6922 3.31154C15.7152 4.88277 14.8977 6.1844 14.8774 6.20759C14.8484 6.23948 14.5846 6.1699 13.2366 5.77564C12.3553 5.51764 11.4654 5.25673 11.2595 5.19296C11.0508 5.13208 10.8798 5.0857 10.874 5.09149C10.8682 5.09729 10.9348 5.40748 11.0218 5.77854C11.1755 6.42501 11.3175 7.04248 12.1118 10.4574C12.6278 12.6809 12.767 13.2665 12.9844 14.1971C13.0917 14.658 13.1757 15.0407 13.1699 15.0465C13.1583 15.0581 13.2569 15.1682 11.1986 12.8781C10.2478 11.8171 9.43029 10.9126 9.3868 10.8691L9.30853 10.785L8.40116 11.9127C7.53728 12.9824 7.48799 13.0375 7.40392 13.0317C7.27927 13.023 5.49062 12.852 3.37149 12.6491C2.40034 12.5534 1.60023 12.4809 1.59443 12.4867C1.58574 12.4954 1.66401 12.8926 2.28728 16.0959C2.70763 18.2498 2.70183 18.2121 2.67284 18.2411C2.65835 18.2556 2.04957 18.5426 1.31903 18.8818C0.591396 19.2181 -0.00288839 19.4993 1.05611e-05 19.5022C0.0376969 19.5341 6.656 24.9174 7.92863 25.9494C8.82441 26.6771 9.55784 27.2829 9.55784 27.3003C9.56074 27.3148 9.27375 27.9497 8.92587 28.7063C8.578 29.4629 8.2939 30.0862 8.2997 30.092C8.3026 30.0949 9.57813 29.9355 11.1291 29.7355C12.6829 29.5354 14.6281 29.2861 15.4543 29.1789C16.2776 29.0745 16.9618 28.9933 16.9705 29.0049C16.9791 29.0136 16.9328 29.6572 16.8661 30.437C16.7965 31.2139 16.6951 32.4054 16.6371 33.0837L16.5327 34.3158L18.4286 34.3245C19.4722 34.3274 20.3303 34.3245 20.339 34.3187C20.3506 34.3071 20.3361 33.9621 20.2579 32.1996C20.2434 31.8633 20.2173 31.2777 20.1999 30.895C20.1825 30.5124 20.1564 29.9442 20.1419 29.634C20.1274 29.3238 20.1187 29.0658 20.1216 29.0629C20.1274 29.0571 22.2465 29.3673 25.8238 29.8949C28.1952 30.2428 28.6155 30.3036 28.6242 30.292C28.63 30.2863 28.5894 30.1645 28.5344 30.0224C28.4793 29.8804 28.2416 29.2484 28.0009 28.6194C27.7632 27.9903 27.5603 27.454 27.5487 27.4279C27.5342 27.3902 28.6184 26.5031 32.3001 23.5317C34.9236 21.4155 37.0718 19.6761 37.0718 19.6645C37.0718 19.6529 36.4601 19.2992 35.7093 18.8818C34.6077 18.2614 34.3467 18.1049 34.3467 18.0585C34.3467 18.0266 34.4395 17.4236 34.5497 16.7221C34.6627 16.0176 34.857 14.7972 34.9816 14.0087C35.1063 13.2201 35.2048 12.5679 35.199 12.5621C35.1903 12.5534 33.938 12.6577 30.726 12.936C30.0157 12.9998 29.4272 13.0433 29.4156 13.0346C29.404 13.0288 29.033 12.5447 28.5894 11.9591C28.1488 11.3706 27.7777 10.8807 27.7661 10.8691C27.7545 10.8546 26.9254 11.7301 25.9253 12.8114C24.9252 13.8927 24.0497 14.8349 23.9801 14.9044L23.8555 15.0349L23.9105 14.8175C23.9395 14.6986 24.0236 14.3536 24.0961 14.0521C24.1685 13.7478 24.2932 13.2346 24.3715 12.9071C25.2093 9.45151 25.4412 8.48906 25.5658 7.97885C25.6441 7.65126 25.8325 6.87724 25.9833 6.25397C26.134 5.6336 26.2529 5.12048 26.2471 5.11758C26.2413 5.11179 25.647 5.25093 24.9223 5.42487C22.0146 6.12642 22.0436 6.12062 22.0204 6.08583C22.0088 6.06554 21.2319 4.76391 20.2955 3.18978C19.3592 1.61565 18.5823 0.325623 18.5736 0.325623C18.562 0.325623 18.5359 0.35461 18.5127 0.3894ZM20.2434 3.54346C21.1478 5.0654 21.9045 6.32644 21.9219 6.34384C21.945 6.36703 22.1509 6.32934 22.693 6.19599C24.757 5.69157 25.9108 5.41907 25.9282 5.43647C25.9369 5.44516 25.6325 6.74969 25.247 8.33252C24.8643 9.91534 24.3019 12.2403 23.9975 13.4984C23.6931 14.7537 23.4467 15.7857 23.4525 15.7915C23.4583 15.7944 24.4207 14.7624 25.5919 13.4984C27.2472 11.7069 27.7284 11.2054 27.7545 11.2344C27.8183 11.301 29.2707 13.2288 29.2794 13.2578C29.2852 13.2752 30.0476 13.2201 31.3173 13.11C32.4334 13.0143 33.6539 12.91 34.0279 12.8781C34.4018 12.8462 34.7584 12.8143 34.8222 12.8085L34.9352 12.7969L34.9178 12.9447C34.9091 13.0288 34.7613 13.9623 34.5932 15.0233C34.425 16.0843 34.2424 17.2323 34.1873 17.5744C34.1119 18.0585 34.0974 18.2063 34.1235 18.2324C34.1438 18.2527 34.7236 18.5861 35.4165 18.9717C36.1064 19.3601 36.6717 19.6877 36.6717 19.6993C36.6688 19.7109 34.5642 21.4184 31.9928 23.4911C29.4214 25.5668 27.3052 27.2742 27.2907 27.2858C27.2791 27.3003 27.4878 27.8917 27.7603 28.6107C28.0299 29.3238 28.259 29.9355 28.2706 29.9703C28.2879 30.0282 28.2735 30.0253 27.5574 29.921C27.1545 29.863 25.9688 29.6891 24.9252 29.5354C23.8815 29.3818 22.3219 29.1528 21.4609 29.0281C20.5999 28.9006 19.8926 28.802 19.8897 28.8049C19.8839 28.8078 19.9332 29.979 19.997 31.4023C20.0607 32.8286 20.1129 34.0172 20.1129 34.0462C20.1129 34.0955 20.0288 34.0984 18.4431 34.0984H16.7704L16.7878 33.9157C16.7994 33.8172 16.8864 32.817 16.982 31.6922C17.0777 30.5674 17.1763 29.4456 17.1966 29.1991C17.2198 28.9527 17.2314 28.744 17.2256 28.7382C17.2169 28.7295 15.1354 28.9933 10.6334 29.576C9.55784 29.7152 8.67366 29.8253 8.66786 29.8224C8.66497 29.8195 8.92877 29.2368 9.25635 28.5295L9.84774 27.2424L9.78396 27.1786C9.72888 27.1264 8.08518 25.7871 1.53935 20.4646C0.927674 19.9689 0.440651 19.5514 0.452246 19.5399C0.463842 19.5283 1.02624 19.2645 1.70459 18.9485C2.38295 18.6354 2.94244 18.3745 2.94824 18.3687C2.95694 18.36 2.62936 16.6583 2.03507 13.6318C1.89012 12.8868 1.86403 12.7331 1.88723 12.7331C1.89302 12.7331 2.44382 12.7853 3.11348 12.8491C3.78024 12.9129 5.00649 13.0317 5.83559 13.11C6.66469 13.1883 7.39813 13.2607 7.4619 13.2694L7.58076 13.2868L8.44755 12.2113C8.92297 11.6228 9.32013 11.1387 9.32882 11.1416C9.33752 11.1416 10.2971 12.2026 11.4596 13.4984C12.6249 14.7943 13.5787 15.8466 13.5845 15.835C13.5874 15.8263 13.4453 15.2001 13.2714 14.4435C13.0946 13.6869 12.9119 12.9042 12.8655 12.7041C12.8192 12.5041 12.6916 11.9504 12.5785 11.4721C12.2481 10.0516 11.6712 7.57009 11.3436 6.1699C11.2566 5.79014 11.1842 5.46256 11.1842 5.44226C11.1842 5.41617 11.2305 5.41907 11.3668 5.45966C12.1524 5.69737 14.9122 6.50038 14.9354 6.50038C14.9528 6.50038 15.7761 5.20165 16.7646 3.61593C17.7532 2.0302 18.5707 0.743069 18.5794 0.754665C18.591 0.766262 19.3389 2.02151 20.2434 3.54346Z"
          fill="#FF0000"
        />
        <path
          d="M16.8227 4.15513C15.3066 6.59894 15.1094 6.90913 15.0544 6.89463C15.0196 6.88594 14.2369 6.65692 13.315 6.38442C12.3931 6.11482 11.6336 5.8945 11.6307 5.9003C11.6278 5.90319 11.6626 6.06843 11.7119 6.26846C11.7583 6.46849 11.8887 7.01929 11.9989 7.49182C12.109 7.96725 12.2917 8.74996 12.4047 9.23119C12.5149 9.71531 12.6917 10.469 12.7932 10.9068C12.8975 11.3445 13.2599 12.9042 13.602 14.371C13.9441 15.8379 14.2224 17.041 14.2166 17.0439C14.2108 17.0496 13.115 15.8408 11.7814 14.3565C10.4479 12.8752 9.34633 11.6605 9.33474 11.6634C9.32314 11.6634 8.96367 12.1069 8.53173 12.649L7.74901 13.6318L7.61856 13.6173C6.79816 13.5303 2.30479 13.11 2.29319 13.1187C2.2845 13.1303 2.50192 14.313 2.60338 14.7914C2.61787 14.8638 2.69615 15.2668 2.77732 15.69C2.85849 16.1133 2.93676 16.5162 2.95125 16.5887C2.96575 16.6612 3.04402 17.0641 3.12519 17.4874C3.20636 17.9106 3.28463 18.3194 3.30203 18.3948C3.32232 18.4759 3.32522 18.5455 3.31072 18.56C3.29623 18.5716 2.78601 18.8151 2.17723 19.0992C1.56556 19.3833 1.06694 19.621 1.06984 19.6297C1.06984 19.6384 3.13679 21.3285 5.66467 23.3867C8.18965 25.4421 10.2566 27.1322 10.2566 27.1438C10.2566 27.1554 10.0276 27.6627 9.74639 28.2715C9.46809 28.8803 9.24487 29.3847 9.25067 29.3905C9.25647 29.3992 10.187 29.2861 11.3176 29.1412C12.4482 28.9962 14.1963 28.773 15.1993 28.6454C16.2052 28.5179 17.1532 28.3961 17.3097 28.3758L17.5909 28.3382V28.4338C17.5909 28.486 17.4924 29.6572 17.3735 31.0313C17.2576 32.4083 17.1561 33.5823 17.1503 33.6432L17.1416 33.7534L18.4461 33.7505C19.1622 33.7505 19.7507 33.7447 19.7565 33.7418C19.7594 33.736 19.713 32.5532 19.6492 31.1095C19.5854 29.6688 19.5332 28.4715 19.5332 28.4483C19.5332 28.399 19.0665 28.3353 23.7918 29.0281C25.966 29.347 27.7489 29.6021 27.7575 29.5934C27.7633 29.5876 27.5662 29.0426 27.3169 28.3845C27.0705 27.7265 26.8763 27.1786 26.8879 27.167C26.9111 27.1496 28.8476 25.5871 33.854 21.5517C35.0107 20.6183 35.9848 19.8297 36.0196 19.795L36.0862 19.7341L34.8977 19.0702C33.8482 18.4846 33.712 18.4006 33.7236 18.3455C33.7294 18.3136 33.8077 17.8266 33.8975 17.27C34.1961 15.3654 34.5208 13.3274 34.5353 13.2433L34.5498 13.1593L34.3845 13.1796C34.2918 13.1882 33.7468 13.2375 33.1728 13.2839C32.5988 13.3332 31.4653 13.4289 30.6507 13.4984C29.7433 13.5767 29.1606 13.6144 29.1403 13.5999C29.123 13.5854 28.7896 13.1564 28.4011 12.6461C27.7373 11.7765 27.6909 11.7214 27.6474 11.7707C27.6213 11.7968 26.5313 12.9737 25.2297 14.3855C23.9251 15.7973 22.8467 16.954 22.8351 16.9598C22.8235 16.9656 22.8235 16.925 22.838 16.8728C22.8525 16.8206 23.0671 15.9278 23.3193 14.8928C23.5686 13.855 24.0962 11.6634 24.4933 10.0226C25.508 5.82782 25.479 5.94668 25.4703 5.90899C25.4645 5.8858 24.8702 6.01625 23.6352 6.31484C22.6322 6.55836 21.8002 6.75838 21.7915 6.76128C21.7799 6.76128 21.0523 5.55532 20.171 4.07976C19.2897 2.60419 18.5621 1.39823 18.5505 1.39823C18.5418 1.39823 17.7649 2.63898 16.8227 4.15513Z"
          fill="#FF0000"
        />
      </svg>

      <p className={classes.title}>helper</p>
    </NavLink>
  )
})

export { Logo }
