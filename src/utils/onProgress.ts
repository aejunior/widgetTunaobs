type progressProperties =  {
    duration: number;
    progress: number;
}

export default function onProgress ({duration, progress}: progressProperties) {
    if(duration === 0) return '0%'
   return (progress / duration) * 100 + '%'
}