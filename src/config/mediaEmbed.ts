const mediaEmbedConfig = {
  previewsInData: true,
  providers: [
    {
      name: 'facebook',
      width: 336,
      height: 596,
      // Updated regex to match both standard and permalink URL patterns
      url: /https:\/\/www\.facebook\.com\/(?:(?:permalink\.php\?story_fbid=(pfbid[\w]+)&id=(\d+))|([^\/\?\&]+)\/([^\/\?\&]+))/,
      html: (match: RegExpMatchArray) => {
        let src;
        if (match[1] && match[2]) {
          // permalink pattern with story_fbid and user id
          const postId = encodeURIComponent(`pfbid${match[1]}`);
          const userId = match[2];
          src = `https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D${postId}%26id%3D${userId}&show_text=true&width=500`;
        } else if (match[3] && match[4]) {
          // standard URL pattern with username and post id
          const userName = match[3];
          const postId = match[4];
          src = `https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F${userName}%2F${postId}`;
        }

        return (
          '<div style="position: relative; text-align: center;">' +
            `<iframe title="facebook" width="336" height="596" style="margin: 0 auto;" src="${src}" frameborder="0" allowfullscreen></iframe>` +
          '</div>'
        );
      }
    },
    {
      name: 'instagram',
      url: /https:\/\/www\.instagram\.com\/p\/([^\/\?\&]+)\/?.*/,
      height: 929,
      width: 550,
      html: (match: RegExpMatchArray) => {
        const id = match[ 1 ];
        return (
          '<div style="position: relative; text-align: center;">' +
            `<iframe title="instagram" width="550" height="929" style="margin: 0 auto;" src="https://www.instagram.com/p/${ id }/embed" frameborder="0" allowfullscreen></iframe>` +
          '</div>'
        );
      }
    },
    {
      name: 'twitter',
      url: /^https?:\/\/(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+?.*)?$/,
      width: 300,
      height: 300,
      html: (match: RegExpMatchArray) => {
        const id = match[ 2 ];
        return (
          '<div style="position: relative; text-align: center;">' +
            `<iframe title="twitter" width="300" height="300" style="margin: 0 auto;" src="https://twitframe.com/show?url=https://twitter.com/${ id }" frameborder="0" allowfullscreen></iframe>` +
          '</div>'
        );
      }
    },
    {
      name: 'youtube',
      url: /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
      height: 320,
      width: 580,
      html: (match: RegExpMatchArray) => {
        const id = match[ 1 ];
        const time = match[ 2 ];
        return (
          '<div style="position: relative; text-align: center">' +
            `<iframe title="youtube" width="580" height="320" src="https://www.youtube.com/embed/${ id }${ time ? `?${ time }` : '' }" ` +
              'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
            '</iframe>' +
          '</div>'
        )
      }
    },
  ],
  extraProviders: [
    {
      name: 'shorts',
      url: /https:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
      width: 336,
      height: 596,
      html: (match: RegExpMatchArray) => {
        const id = match[ 1 ];
        return (
          '<div style="position: relative; text-align: center;">' +
          `<iframe title="shorts" width="336" height="596" style="margin: 0 auto;" src="https://www.youtube.com/embed/${ id }" frameborder="0" allowfullscreen></iframe>` +
          '</div>'
        );
      }
    },
    {
      name: 'reel',
      url: /https:\/\/www\.instagram\.com\/reel\/([^\/\?\&]+)\/?.*/,
      height: 929,
      width: 550,
      html: (match: RegExpMatchArray) => {
        const id = match[ 1 ];
        return (
          '<div style="position: relative; text-align: center;">' +
            `<iframe title="reel" width="550" height="929" style="margin: 0 auto;" src="https://www.instagram.com/reel/${ id }/embed/captioned" frameborder="0" allowfullscreen></iframe>` +
          '</div>'
        );
      }
    },
    {
      name: 'linkedin',
      url: /https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:([a-zA-Z:0-9]+)/,
      width: 504,
      height: 1000,
      html: (match: RegExpMatchArray) => {
        const id = match[ 1 ];
        return (
          '<div style="position: relative; text-align: center;">' +
            `<iframe title="linkedin" width="420" height="1000" style="margin: 0 auto;" src="https://www.linkedin.com/embed/feed/update/urn:li:${ id }" frameborder="0" scrolling="no" allowtransparency="true"></iframe>` +
          '</div>'
        );
      }
    },
    {
      name: 'spotify',
      url: /https:\/\/open\.spotify\.com(?:\/intl-fr)?\/(playlist|track|album|artist)\/([a-zA-Z0-9]+)/,
      width: 600,
      height: 352,
      html: (match: RegExpMatchArray) => {
        const type = match[1]; // playlist, track, album, artist
        const id = match[2];   // L'ID unique du contenu
    
        // Construire l'URL d'embed en fonction du type (playlist, track, album, artist)
        const embedUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
    
        return (
          '<div style="position: relative; text-align: center;">' +
            `<iframe title="spotify" width="100%" height="352" style="margin: 0 auto;" src="${embedUrl}" frameborder="0" scrolling="no" allowtransparency="true"></iframe>` +
          '</div>'
        );
      }
    },
    {
      name: 'tiktok',
      // Regex pour capturer l'URL TikTok avec l'option "intl-fr"
      url: /https:\/\/www\.tiktok\.com(?:\/intl-fr)?\/@([a-zA-Z0-9_.]+)\/video\/([0-9]+)/,
      width: 100,
      height: 500,
      html: (match: RegExpMatchArray) => {
        const username = match[1]; // Capture le nom d'utilisateur
        const videoId = match[2];  // Capture l'ID de la vidéo
    
        // Construire l'URL d'embed TikTok
        const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;
    
        return (
          '<div style="position: relative; text-align: center;">' +
            `<iframe title="tiktok" width="100%" height="500" style="margin: 0 auto;" src="${embedUrl}" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>` +
          '</div>'
        );
      }
    },
  ]
}
// combine all providers to help with rendering
export const allProviders = mediaEmbedConfig.providers.concat(mediaEmbedConfig.extraProviders).reduce((acc: any, provider: any) => {
  acc[provider.name] = provider;
  return acc;
}
, {});

export default mediaEmbedConfig;