"use client";
import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import "@/style/not-found.css";

interface NotFoundProps{reset?: () => void;}
function NotFound( { reset }: NotFoundProps ){
				const [ pageX, setPageX ] = useState( 0 );
				const [ pageY, setPageY ] = useState( 0 );
				const [ xAxis, setXAxis ] = useState( 0 );
				const [ yAxis, setYAxis ] = useState( 0 );
				const router = useRouter();
				useEffect( () => {
								if( window ){
												setPageX( window.innerWidth );
												setPageY( window.innerHeight );
								}
				}, [] );
				return (
								<div
												style = { { width: "100%", height: "100%!important", maxHeight: "100%", borderRadius: "0!important", background: color.PRIMARY } }
												className = "box" onMouseMove = { function( event ){
												setXAxis( -(event.pageX / -pageX) * 100 - 100 );
												setYAxis( (pageY / 2 - (event.pageY)) / pageY * 300 );
								} }
								>
												<div className = "box__ghost">
																<div className = "symbol"></div>
																<div className = "symbol"></div>
																<div className = "symbol"></div>
																<div className = "symbol"></div>
																<div className = "symbol"></div>
																<div className = "symbol"></div>
																<div className = "box__ghost-container">
																				<div className = "box__ghost-eyes" style = { { 'transform': 'translate(' + xAxis + '%,-' + yAxis + '%)' } }>
																								<div className = "box__eye-left"></div>
																								<div className = "box__eye-right"></div>
																				</div>
																				<div className = "box__ghost-bottom">
																								<div></div>
																								<div></div>
																								<div></div>
																								<div></div>
																								<div></div>
																				</div>
																</div>
																<div className = "box__ghost-shadow"></div>
												</div>
												<div className = "box__description">
																<div className = "box__description-container">
																				<div className = "box__description-title">Whoops!</div>
																				<div className = "box__description-text">Có vẻ như chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.</div>
																</div>
																<Button fullWidth variant = { "contained" } sx = { { bgcolor: color.FOUR, color:color.LIGHT_TEXT } } onClick = { () => router.back() }>{appStrings.GO_BACK}</Button>
												</div>
								</div>
				);
}
export default memo( NotFound );

