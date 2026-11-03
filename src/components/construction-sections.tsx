import { Children, Fragment, type CSSProperties, type ReactNode } from "react";

export function BrickDivider({ course = 1, children }: { course?: number; children?: ReactNode }) {
  return (
    <div className={`brick-divider${children ? " brick-divider-story" : ""}`}>
      <div className="container">
        <div className="divider-survey" aria-hidden="true"><span>+ ── {String(course).padStart(2, "0")}</span><span>1 : 1 ── +</span></div>
        <div className="divider-wall" data-reveal aria-hidden="true">
          {[0, 1].map((row) => <div className="divider-course" key={row}>
            {Array.from({ length: 12 }, (_, brick) => <span className="divider-brick" key={brick} style={{ "--brick-delay": `${Math.min((row * 3 + brick) * 40, 520)}ms` } as CSSProperties}><i /><i /></span>)}
          </div>)}
        </div>
        {children}
        <span className="divider-foundation" aria-hidden="true" />
      </div>
    </div>
  );
}

export function ConstructionSections({ children }: { children: ReactNode }) {
  const sections = Children.toArray(children);
  return sections.map((child, index) => (
    <Fragment key={index}>
      {index === Math.ceil(sections.length / 2) && <BrickDivider />}
      {child}
    </Fragment>
  ));
}
