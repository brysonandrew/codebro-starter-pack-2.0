import * as React from 'react';

interface IProps {}

export function BackgroundVideo(props: IProps) {
    return (
        <video
            id="video"
            preload="auto"
            muted={true}
            loop={true}
            autoPlay={true}
        >
            <source src="http://mazwai.com/system/posts/videos/000/000/123/original/victor_ciurus--5d_mark_iii_magic_lantern_14_bits_raw_video.mp4?1412890624" type="video/mp4"/>
            <source src="http://mazwai.com/system/posts/videos/000/000/123/webm/victor_ciurus--5d_mark_iii_magic_lantern_14_bits_raw_video.webm?1412890624" type="video/webm"/>
        </video>
    );
}
