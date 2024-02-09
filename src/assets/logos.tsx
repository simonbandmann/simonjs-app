export const Logo = ({ className }: { className?: string }) => (
    <svg
        width='255'
        height='460'
        viewBox='0 0 255 460'
        fill='none'
        className={className}
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M163.704 240.665L0 256.136L118.485 128.068L236.97 0L163.704 240.665Z'
            fill='url(#paint0_linear_321_36)'
        />
        <path
            d='M90.6901 219.335L254.394 203.864L135.909 331.932L17.4241 460L90.6901 219.335Z'
            fill='url(#paint1_linear_321_36)'
        />
        <defs>
            <linearGradient
                id='paint0_linear_321_36'
                x1='118.485'
                y1='0'
                x2='118.485'
                y2='256.136'
                gradientUnits='userSpaceOnUse'
            >
                <stop stopColor='#344055' />
                <stop offset='1' stopColor='#303845' />
            </linearGradient>
            <linearGradient
                id='paint1_linear_321_36'
                x1='135.909'
                y1='460'
                x2='135.909'
                y2='203.864'
                gradientUnits='userSpaceOnUse'
            >
                <stop stopColor='#D9D9DA' stopOpacity='0.56' />
                <stop offset='0.5' stopColor='#9B94A7' />
                <stop offset='1' stopColor='#888098' />
            </linearGradient>
        </defs>
    </svg>
)
