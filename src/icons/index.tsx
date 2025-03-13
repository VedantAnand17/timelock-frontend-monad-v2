const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    viewBox="0 0 13 13"
    fill="none"
  >
    <path
      d="M3.04528 5.09312C3.07128 5.03031 3.11533 4.97661 3.17185 4.93883C3.22837 4.90105 3.29483 4.88087 3.36282 4.88086H10.2378C10.3058 4.88081 10.3724 4.90094 10.4289 4.93871C10.4855 4.97647 10.5296 5.03018 10.5557 5.09303C10.5817 5.15587 10.5885 5.22503 10.5752 5.29175C10.5619 5.35846 10.5292 5.41974 10.481 5.46781L7.04352 8.90531C7.01159 8.93727 6.97368 8.96263 6.93195 8.97993C6.89022 8.99723 6.84549 9.00613 6.80032 9.00613C6.75514 9.00613 6.71041 8.99723 6.66868 8.97993C6.62695 8.96263 6.58904 8.93727 6.55711 8.90531L3.11961 5.46781C3.07155 5.41971 3.03884 5.35844 3.02561 5.29174C3.01238 5.22505 3.01922 5.15593 3.04528 5.09312Z"
      fill="currentColor"
    />
  </svg>
);

const LongIcon = () => (
  <div className="rounded-[5px] border border-[#137550] p-[5px]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
    >
      <g clipPath="url(#clip0_353_8186)">
        <path
          d="M9.51562 4.29993H13.5156V8.29993"
          stroke="#16C784"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5156 4.29993L7.86562 9.94993C7.77216 10.0415 7.6465 10.0929 7.51562 10.0929C7.38475 10.0929 7.25909 10.0415 7.16563 9.94993L4.86562 7.64993C4.77216 7.55831 4.6465 7.507 4.51562 7.507C4.38475 7.507 4.25909 7.55831 4.16563 7.64993L0.515625 11.2999"
          stroke="#16C784"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_353_8186">
          <rect
            width={14}
            height={14}
            fill="white"
            transform="translate(0.015625 0.799927)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
);

const ShortIcon = () => (
  <div className="rounded-[5px] border border-[#7D2F32] p-[5px]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
    >
      <g clipPath="url(#clip0_353_8223)">
        <path
          d="M9.51611 10.8999H13.5161V6.8999"
          stroke="#EC5058"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5161 10.8999L7.86611 5.2499C7.77265 5.15829 7.64699 5.10697 7.51611 5.10697C7.38524 5.10697 7.25958 5.15829 7.16611 5.2499L4.86611 7.5499C4.77265 7.64152 4.64699 7.69283 4.51611 7.69283C4.38524 7.69283 4.25958 7.64152 4.16611 7.5499L0.516113 3.8999"
          stroke="#EC5058"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_353_8223">
          <rect
            width={14}
            height={14}
            fill="white"
            transform="translate(0.0161133 0.399902)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
);

export { ChevronDown, LongIcon, ShortIcon };
