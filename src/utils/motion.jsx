// src/utils/motion.js
// A simple motion utility to handle animations without requiring external libraries
'use client';
import { useEffect, useState } from 'react';



export const motion = {
    div: ({ children, initial, animate, transition, className, ...props }) => {
      'use client';
      const [isVisible, setIsVisible] = useState(false);
      
      useEffect(() => {
        setIsVisible(true);
      }, []);
      
      const getStyles = () => {
        if (!initial || !animate) return {};
        
        const styles = {
          transition: `all ${transition?.duration || 0.3}s ${transition?.delay ? `${transition.delay}s` : '0s'} ease`,
        };
        
        if (initial.opacity !== undefined || animate.opacity !== undefined) {
          styles.opacity = isVisible ? (animate.opacity ?? 1) : (initial.opacity ?? 0);
        }
        
        if (initial.y !== undefined || animate.y !== undefined) {
          styles.transform = `translateY(${isVisible ? (animate.y ?? 0) : (initial.y ?? 0)}px)`;
        }
        
        return styles;
      };
      
      return (
        <div 
          className={className} 
          style={getStyles()} 
          {...props}
        >
          {children}
        </div>
      );
    }
  };