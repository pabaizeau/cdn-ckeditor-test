const highlightIconToolBar =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M592 96.5H48c-26.5 0-48 21.5-48 48v223c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48v-223c0-26.5-21.5-48-48-48zm-6 271H54c-3.3 0-6-2.7-6-6v-211c0-3.3 2.7-6 6-6h532c3.3 0 6 2.7 6 6v211c0 3.3-2.7 6-6 6z" ></path></svg>';
const highlightVariants = {
  INFO: "info",
  PARKING: "parking",
  SPOT: "spot",
  ACTION: "action",
  TIP: "tip",
  HOTEL: "housing",
  VISIT: "activity",
  RESTAURANT: "restaurant",
  FAVORITE: "favorite",
};

const highlights = {
  [highlightVariants.INFO]: {
    title: "Bon à savoir",
    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12.4" stroke="#0D0D0D" stroke-width="1.2"/><path d="M16 16L16 22" stroke="#0D0D0D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="11" r="1" fill="#0D0D0D"/></svg>',
  },
  [highlightVariants.PARKING]: {
    title: "En voiture",
    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12.4" stroke="#0D0D0D" stroke-width="1.2"/><path d="M14 14L14 22" stroke="#0D0D0D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11H17C18.6569 11 20 12.3431 20 14V14C20 15.6569 18.6569 17 17 17H14V11Z" stroke="#0D0D0D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  [highlightVariants.SPOT]: {
    title: "Titre spot",
    icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="12" r="6.4" stroke="#0D0D0D" stroke-width="1.2"/><path d="M16 19L16 27" stroke="#0D0D0D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  [highlightVariants.ACTION]: {
    title: "En action",
    icon: '<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 32 32"><path d="M22.361 9.507l.03.458.451.09 2.054.41-2.172 2.028h-3.256l-.157-2.378 2.918-2.588.132 1.98z" stroke="black" fill="transparent" stroke-width="1.2"></path><path d="M16 16l3.5-3.5M22 16c0 3.314-2.686 6-6 6-3.315 0-6-2.686-6-6 0-3.315 2.685-6 6-6" stroke="black" fill="transparent" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"></path><path d="M26 16c0 5.524-4.476 10-10 10S6 21.524 6 16 10.476 6 16 6" stroke="black" fill="transparent" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"></path></svg>',
  },
  [highlightVariants.FAVORITE]: {
    title: "Coup de coeur",
    icon: '<svg width="32" height="32" fill="transparent" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 32 32" ><path d="M16.16 8.834s3.4-6.661 8.89-2.423c3.659 3.332 1.046 7.873 1.046 7.873C24 18 16 27 16 27S8 18 5.96 14.284c0 0-2.615-4.238.785-7.57 3.4-3.333 7.322-1.212 8.891 2.12 0 0 .262.606.523 0z" stroke="black" fill="transparent" stroke-width="1.3" stroke-miterlimit="10"></path></svg>',
  },
  [highlightVariants.TIP]: {
    title: "Le conseil de la rédac",
    icon: '<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 32 32" ><path d="M12.452 27v-2.52s.131-1.194-1.313-2.387c-1.445-1.194-3.153-3.183-3.153-5.968 0-2.786 1.708-8.22 8.01-8.22 6.3 0 7.877 6.233 7.877 7.954 0 1.724-.788 4.244-3.152 6.101-1.182 1.194-1.576 1.724-1.576 2.653V27h-6.693zM17.183 11.485s3.02 1.99 2.626 4.642M8.647 23.685l-1.576 1.592M5.364 16.128H3M6.809 6.843l1.707 1.724M16 3v2.255M25.06 6.578l-1.577 1.724M29 15.863h-2.232M22.173 23.814l1.576 1.592" stroke="black" fill="transparent" stroke-width="1.2" stroke-miterlimit="10"></path></svg>',
  },
  [highlightVariants.HOTEL]: {
    title: "Titre hébergement",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3.23828" y1="20.545" x2="28.1362" y2="20.545" stroke="#0D0D0D" stroke-width="1.37128"/>
    <path d="M10.8518 14.7033C10.8518 15.9617 9.83173 16.9817 8.57341 16.9817C7.31509 16.9817 6.29501 15.9617 6.29501 14.7033C6.29501 13.445 7.31509 12.4249 8.57341 12.4249C9.83173 12.4249 10.8518 13.445 10.8518 14.7033Z" stroke="#0D0D0D" stroke-width="1.37128"/>
    <path d="M14.1445 20.0437L14.1445 9.37308" stroke="#0D0D0D" stroke-width="1.37128" stroke-linecap="round"/>
    <path d="M3 7L3 24.7844" stroke="#0D0D0D" stroke-width="1.37128" stroke-linecap="round"/>
    <path d="M14.2363 9.3739H22.2139C25.4879 9.3739 28.142 12.028 28.142 15.302V24.787" stroke="#0D0D0D" stroke-width="1.37128" stroke-linecap="round"/>
    </svg>
    `,
  },
  [highlightVariants.RESTAURANT]: {
    title: "Titre restaurant",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9448 9.87747L7.59011 4.52275C6.73474 3.66738 5.3479 3.66738 4.49253 4.52275C2.50249 6.51279 2.50249 9.73927 4.49253 11.7293L9.53635 16.7731L10.5794 15.7301L5.5356 10.6863C4.12162 9.27228 4.12162 6.97978 5.5356 5.56581C5.8149 5.28651 6.26774 5.28651 6.54704 5.56581L12.508 11.5267C12.5745 10.9634 12.7202 10.4077 12.9448 9.87747ZM19.1364 20.178L24.0262 25.0678C24.3055 25.3471 24.7583 25.3471 25.0376 25.0678C25.3169 24.7885 25.3169 24.3356 25.0376 24.0563L21.2853 20.304C21.8486 20.2374 22.4043 20.0918 22.9345 19.8671L26.0807 23.0133C26.9361 23.8686 26.9361 25.2554 26.0807 26.1108C25.2253 26.9662 23.8385 26.9662 22.9831 26.1108L18.0934 21.2211L19.1364 20.178Z" fill="#0D0D0D"/>
    <path d="M23.6543 3L16.0526 10.6017C15.1449 11.5094 15.1449 12.9811 16.0526 13.8889V13.8889C16.2795 14.1158 16.2795 14.4837 16.0526 14.7107L6.19097 24.5723C5.62364 25.1396 5.62364 26.0594 6.19097 26.6268V26.6268C6.75831 27.1941 7.67814 27.1941 8.24548 26.6268L18.1071 16.7652C18.3341 16.5382 18.702 16.5382 18.9289 16.7652V16.7652C19.8367 17.6729 21.3084 17.6729 22.2161 16.7652L29.8178 9.1635M25.7088 5.0545L19.5453 11.218M27.7633 7.109L21.5998 13.2725" stroke="#0D0D0D" stroke-width="1.47511"/>
    </svg>
    `,
  },
  [highlightVariants.VISIT]: {
    title: "Titre activité",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3962 20L16.5 17.6L19.5288 19.9423L18.3577 16.1692L21.5769 13.6769H17.7462L16.5 9.84612L15.2538 13.6769H11.4231L14.5673 16.1692L13.3962 20ZM5.42306 26C4.75191 26 4.18028 25.7639 3.70815 25.2918C3.23605 24.8197 3 24.2481 3 23.5769V20.4183C3 20.201 3.05384 20.0019 3.16151 19.8212C3.26921 19.6404 3.4221 19.5058 3.62017 19.4173C4.33557 19.0058 4.91106 18.4606 5.34664 17.7817C5.78221 17.1029 6 16.3423 6 15.5C6 14.6577 5.78221 13.8971 5.34664 13.2183C4.91106 12.5394 4.33557 11.9942 3.62017 11.5827C3.4221 11.4942 3.26921 11.3596 3.16151 11.1788C3.05384 10.9981 3 10.7991 3 10.5817V7.42306C3 6.75191 3.23605 6.18027 3.70815 5.70815C4.18028 5.23605 4.75191 5 5.42306 5H27.5769C28.2481 5 28.8197 5.23605 29.2919 5.70815C29.764 6.18027 30 6.75191 30 7.42306V10.5817C30 10.7991 29.9462 10.9981 29.8385 11.1788C29.7308 11.3596 29.5779 11.4942 29.3798 11.5827C28.6644 11.9942 28.0889 12.5394 27.6534 13.2183C27.2178 13.8971 27 14.6577 27 15.5C27 16.3423 27.2178 17.1029 27.6534 17.7817C28.0889 18.4606 28.6644 19.0058 29.3798 19.4173C29.5779 19.5058 29.7308 19.6404 29.8385 19.8212C29.9462 20.0019 30 20.201 30 20.4183V23.5769C30 24.2481 29.764 24.8197 29.2919 25.2918C28.8197 25.7639 28.2481 26 27.5769 26H5.42306ZM5.42306 24.5H27.5769C27.8462 24.5 28.0673 24.4135 28.2404 24.2404C28.4135 24.0673 28.5 23.8462 28.5 23.5769V20.675C27.575 20.125 26.8438 19.3938 26.3063 18.4813C25.7688 17.5688 25.5 16.575 25.5 15.5C25.5 14.425 25.7688 13.4313 26.3063 12.5188C26.8438 11.6063 27.575 10.875 28.5 10.325V7.42306C28.5 7.15384 28.4135 6.93269 28.2404 6.75961C28.0673 6.58654 27.8462 6.5 27.5769 6.5H5.42306C5.15384 6.5 4.93269 6.58654 4.75961 6.75961C4.58654 6.93269 4.5 7.15384 4.5 7.42306V10.325C5.425 10.875 6.15625 11.6063 6.69375 12.5188C7.23125 13.4313 7.5 14.425 7.5 15.5C7.5 16.575 7.23125 17.5688 6.69375 18.4813C6.15625 19.3938 5.425 20.125 4.5 20.675V23.5769C4.5 23.8462 4.58654 24.0673 4.75961 24.2404C4.93269 24.4135 5.15384 24.5 5.42306 24.5Z" fill="#0D0D0D"/>
    </svg>
    `,
  },
};

export { highlightIconToolBar, highlightVariants, highlights };
