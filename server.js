var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var data = require("./data.js");
var _ = require("underbar");
var twilio = require('twilio')(process.env['TwilioKey'], process.env['TwilioSecret']);


//var db = JSON.parse(data);

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/Client'));
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});

app.get('/requestAll', function(req, res) {
    res.send(db);
    res.end();
});

app.post('/search', function(req, res) {
    if (req.body) {
        req.body.query = req.body.query.toUpperCase();
        var searchString = '"' + req.body.query + '" --> "' + db[req.body.query] + '".';
        console.log(searchString);
        console.log(req.body.query);
        var returnObj = {};
        returnObj.Empty = false;
        if (req.body.query === ""){
            console.log("made it here");
            returnObj.query = "";
            returnObj.data = [];
            res.send(returnObj);
        }
        else if (!db[req.body.query]){
            var emptyReturn = [];
            twilioReport(searchString);
            emptyReturn[0] = "We don't have the acronym " + req.body.query + "...";
            returnObj.query = "Disaster!";
            returnObj.empty = true;
            returnObj.data = emptyReturn;
            res.send(returnObj);
        }
        else{
            twilioReport(searchString);
            returnObj.query = req.body.query;
            returnObj.data = db[req.body.query];
            res.send(returnObj); 
        }
    }else{
        res.sendStatus(400);
    }
    res.end();
});

app.post('/submitAcronym', function(req, res) {
    
    var returnObj = {};
    if (req.body) {
        var submission = req.body.submission;
        var twillioString = "Acronym Requested!\rAcro: " + submission.Acronym + "\rDef: " + submission.Definition + "\rCont: " + submission.Context + "\r Email: " + submission.Email;
        twilioReport(twillioString);
        returnObj.message = "Message Sent!";
        res.send(returnObj);
    }
    else {
        res.sendStatus(400);
    }
    res.end();
});

app.post('/submitReport', function(req, res) {
    
    var returnObj = {};
    if (req.body) {
        var submission = req.body.submission;
        var twillioString = "Acronym Reported...\Name: " + submission.name + "\rDescription: " + submission.def + "\rComplaint: " + submission.description;
        twilioReport(twillioString);
        returnObj.message = "Message Sent!";
        res.send(returnObj);
    }
    else {
        res.sendStatus(400);
    }
    res.end();
});
var twilioReport = function(searchString){
    twilio.sms.messages.create({
        to:process.env['PersonalNumber'],
            from:process.env['TwilioNumber'],
        body:searchString
        }, 
        function(error, message) {
            if (!error) {
                console.log('Success! The SID for this SMS message is:');
                console.log(message.sid);
        
                console.log('Message sent on:');
                console.log(message.dateCreated);
            } else {
                console.log('Oops! There was an error.');
                console.log(error);
        }
    });
}

var db = JSON.parse('{"321":["Three2One (321)"],"3DA":["3D Annotations"],"AAP":[""],"AAUGA":["Autodesk Animation User Group Association (AAUGA)"],"AC":["Autodesk Consulting (AC)"],"ACAD":["AutoCAD (ACAD or ACD)"],"ACD":["AutoCAD (ACAD or ACD)"],"ACE":["Autodesk Certification Evaluator (ACE)"],"ACI":["Autodesk Certified Instructor (ACI)"],"ACM":["Access Control Management (ACM)"],"ACRD":["Autodesk China Research and Development (ACRD)"],"AD":["Autodesk"],"ADN":["Autodesk Developer Network (ADN)"],"ADSK":["Autodesk (ADSK)"],"AFP":["Advanced Fiber Placement"],"AIM":["Autodesk Infrastructure Modeler (AIM)"],"AIP":["Autodesk Incentive Program"],"AISA":["Autodesk Industry Solutions Academy (AISA)"],"AKN":["Autodesk Knowledge Network (AKN)"],"AKP":["Autodesk Knowledge Platform (AKP)"],"ALC":["Autodesk Learning Central (ALC)"],"ALP":["Autodesk Leadership Program (ALP)"],"AMER":["Americas (AMER)"],"AMPs":["Aligned Marketing Programs (AMPs)"],"ANZ":["Australia and New Zealand (ANZ)"],"AP":["Accounts Payable (AP)"],"APAC":["Asia-Pacific (APAC)"],"API":["Application Program Interface"],"AR":["Action Request (AR)"],"ARC":["Average Revenue Class (ARC)"],"ARPV":["Accumulated Reseller Purchase Value (ARPV)"],"ARR":["Annual Recuring Revenue"],"ASAP":[""],"ASEAN":["Association of Southeast Asian Nations (ASEAN)"],"ASM":["Autodesk Shape Manager (ASM)"],"ASP":["Average Selling Price (ASP)"],"ASRD":["Autodesk Singapore Research and Development (ASRD)"],"ATC":["Autodesk Authorized Training Center (ATC)"],"ATL":["Automated Tape Laying"],"ATUBE":[""],"AU":["Autodesk University (AU)"],"AUGI":["Autodesk User Group International (AUGI)"],"AWS":["Autodesk Workplace Strategy (AWS)"],"AdLM":["Autodesk License Management System (AdLM)"],"AutoCAD DXF":["AutoCAD Drawing Exchange Format (AutoCAD DXF)"],"BATT":["Better Application Than TAD (BATT)"],"BC":["Business Continuity (BC)"],"BCP":["Business Continuity Planning (BCP)"],"BIA":["Business Impact Analysis (BIA)"],"BIM":["Building Information Modeling (BIM)"],"BOM":["Bill of Material (BOM)"],"BPA":["Business Process Assessment"],"BRIC":["Brazil, Russia, India, and China (BRIC)"],"C13N":["Countrification (C13N)"],"CAD":["Computer Aided Drafting (CAD)"],"CAGR":["Compound Annual Growth Rate (CAGR)"],"CAM":["Computer Aided Drafting (CAM)"],"CBC":["Customer Briefing Center (CBC)"],"CBP":["Customer Briefing Program (CBP)"],"CCB":["Change Control Board (CCB)"],"CDC":["Custom Development Center (CDC)"],"CDDP":["Competitive Deal Discount Pricing (CDDP)"],"CDE":[""],"CDF":["Channel Development Funds (CDF)"],"CEP":["Client Engagement Plan (CEP)"],"CER":["Customer Error Reporting (CER)"],"CES":["Customer Effort Score (CES)"],"CF":["Carbon Fiber"],"CFD":["Computational Fluid Dynamics (CFD)"],"CFERT":["Configurable FERT (CFERT)"],"CFRP":["Carbon-Fiber-Reinforced Polymer"],"CFRTP":["Carbon-Fiber-Reinforced Polymer"],"CHS":["Czech Republic, Hungary, and Southeastern Europe (CHS)"],"CIM":["Computer-Integrated Manufacturing (CIM)"],"CIP":["Customer Involvement Program (CIP)"],"CIS":["Commonwealth of Independent States (CIS)"],"CLic":["Cloud Licensing (CLic)"],"CM":["Subscription Contract Manager (CM)"],"CMT":["Crisis Management Team (CMT)"],"CMP":["Composites Manufacturing Preparation"],"COBC":["Code of Business Conduct (COBC)"],"COGS":["Cost of Goods Sold (COGS)"],"CPD":["Composites Design"],"CQS":["Contract Quantity Scale (CQS)"],"CR":["Community Relations (CR)"],"CRB":["Channel Review Board (CRB)"],"CRD":["Customer Requirement Document (CRD)"],"CRE":["Corporate Real Estate (CRE)"],"CREFTS":["Corporate Real Estate, Facilities, Travel, Safety, and Security (CREFTS)"],"CRM":["Customer Relationship Management (CRM)"],"CRP":["Carbon-Fiber-Reinforced Polymer"],"CSC":["Channel Sales Capacity (CSC)"],"CSI":["Consulting System Integrator Partner Program (CSI)"],"CSM":["Customer Success Manager (CSM)"],"CSN":[""],"CSS":["Customer Service and Support (CSS)"],"CV":["Customer Value (CV)"],"CX":["Customer Experience (CX)"],"CXD":["Customer Experience Design (CXD)"],"CY":["Calendar Year (CY)"],"D&B":[""],"DACH":["Deutschland, Austria, Switzerland (Confoederatio Helvetica) (DACH)"],"DAM":["Digital Asset Management (DAM)"],"DAP":["Data Analytics Platform (DAP)"],"DDA":["Deal Discount Approval (DDA)"],"DEC":["Digital Entertainment Creation (DEC)"],"DERL":[""],"DEV":["Development"],"DID":["Defect ID (DID)"],"DISO":["Departmental Individual Standing Offer (DISO)"],"DLS":["Design, Lifecycle, and Simulation (DLS)"],"DMR":["Direct Marketing Reseller (DMR)"],"DR":["Disaster Recovery (DR)"],"DSS":["Designated Support Specialist"],"DTS":[""],"DUNS":[""],"DUPA":[""],"DVAR":["Direct Value-Added Reseller (DVAR)"],"DevTech":["Developer Technical Services (DevTech)"],"EAI":["Enterprise Application Integration (EAI)"],"EB":["Partner Earnbacks (EB)"],"EBA":["Enterprise Business Agreement (EBA)"],"ECCN":["Export Control Classification Number (ECCN)"],"ECO":["Engineering Change Order (ECO)"],"EDM":["Engineering Data Management (EDM)"],"EDU":["Education (EDU)"],"EEOP":["Engineering Edge Of Part"],"EHP":[""],"EIS":["Enterprise Information Services (EIS)"],"ELP":["Employee Leadership Program (ELP)"],"EMEA":["Europe, Middle East, and Africa (EMEA)"],"EMIA":["Europe, Middle East, India, and Africa (EMIA)"],"ENI":["Engineering, Natural Resources, and Infrastructure (ENI)"],"ENT":["Enterprise"],"EOC":["Enterprise Operations Center (EOC)"],"EOM":["End of Month (EOM)"],"EOQ":["End of Quarter (EOQ)"],"ERM":["Enterprise Risk Management (ERM)"],"ERP":["Employee Referral Program (ERP)"],"ERT":["Emergency Response Team (ERT)"],"ESD":["Electronic Software Download (ESD)"],"ESSO":["Enterprise Single Sign-On (ESSO)"],"ETR":["Employee Training Registration (ETR)"],"EUE":["End-User Expenditure (EUE)"],"EidM":["Enterprise Identity Management (EidM)"],"FBP":["Finance Business Partner (FBP)"],"FCS":["First Customer Shipment (FCS)"],"FE":["Finite Element"],"FEA":["Finite Element Analysis"],"FDM":[""],"FIFA":["Federation Interantionale de Football Association"],"FIRST":["For Inspiration and Recognition of Science and Technology (FIRST)"],"FOMT":["Future of Making Things"],"FPA":["Financial Planning and Analysis (FPA)"],"FPS":["Finance Processes and Systems (FPS)"],"FQ":["Fiscal Quarter (FQ)"],"FRED":["Future Requirements Enterprise Document (FRED)"],"FRT":["Functional Recovery Team (FRT)"],"FRP":["Fiber-Reinforced Plastic"],"FTE":["Full-Time Equivalent (FTE)","Full Time Employee"],"FTR":["First Touch Resolution (FTR)"],"FY":["Fiscal Year (FY)"],"FoMT":[""],"GA":["Global Account (GA)"],"GBS":["Global Business Services (GBS)"],"GCSO":["Global Customer Support and Operations (GCSO)"],"GE":["Global Engineering (GE)"],"GET":[""],"GI":["Global Initiative (GI)"],"GL":["General Ledger (GL)"],"GLOB":["Globalization (GLOB)"],"GNUL":["Global Network User License (GNUL)"],"GRP":["Global Reference Price (GRP)"],"GS":["Global Services (GS)"],"GSO":["Global Sales Operations (GSO)"],"GSOST":["Global Subscription Operations and Services Team (GSOST)"],"GST":["Goods and Services Tax (GST)"],"GUI":["Graphical User Interface (GUI)"],"GUID":["Globally Unique Identifier (GUID)"],"GoalPOST":[""],"HD":[""],"HEM":["High Efficency Machining"],"HR":["Human Resources (HR)"],"HRBP":[""],"HRIS":["Human Resources Information Services (HRIS)"],"HSM":["High Speed Manufacturing"],"IA":["Information Architecture"],"IAP":["Individual Accountability Program (IAP)"],"IC":["Industry Composition"],"ICE":["International Customer Experience (ICE)"],"IDEA":["Innovators in Design, Engineering, and Art (IDEA)"],"IE":["Internet Exploerer"],"IIOT":["Integrated Internet Of Things"],"ILT":[""],"INV":["Inventor"],"IORD":["Internet Order (IORD)"],"IOT":["Internet of Things"],"IPD":["Integrated Project Delivery (IPD)"],"IPG":["Information Modeling and Platform Products Group (IPG)"],"IPM":["In-Product Marketing (IPM)"],"ISM":["Industry, Strategy, and Marketing (ISM)"],"ISV":["Independent Software Vendor (ISV)"],"ITM":["In-Trial Marketing (ITM)"],"IVAR":["Indirect Value-Added Reseller (IVAR)"],"KPI":["Key Performance Indicator"],"KSO":["Key Strategic Objective (KSO)"],"LC":["Letter of Credit (LC)"],"LEAP":[""],"LI":["Local Initiative (LI)"],"LMV":["Large Model Viewing (LMV)"],"LSA":["License and Services Agreement (LSA)"],"LSP":["Logistics Service Provider (LSP)"],"LUMA":["Looking Understanding Making Awesome (LUMA)"],"LVA":["Low-Value Asset (LVA)"],"LX":["Learning Experience"],"M&E":["Media and Entertainment Product Group (M&E)"],"MALT":["Major Account Leadership Team (MALT)"],"MBE":["Model Based Enterprise"],"MEOP":["Manufacturing Edge Of Part"],"MFG":["Manufacturing and Engineering"],"MDF":["Marketing Development Funds (MDF)"],"MDM":[""],"MEP":["Mechanical, Electrical, and Plumbing (MEP)"],"MES":["Manufacturing Execution System"],"MGS":["Marketing Guidelines Site (MGS)"],"MIDM":["Market Intelligence Datamart (MIDM)"],"MIM":["Marketing Investment Management (MIM)"],"MJA":["Major Account (MJA)"],"MLD":["Multi-Language Deployment (MLD)"],"MPG":["Material Pricing Group (MPG)","Material Product Group (MPG)", "Manufacturing Product Group"],"MRU":["Minimum Releasable Unit (MRU)"],"MSA":[""],"MSI":["Magestic Systems Incorporated"],"MTBF":["Mean Time Between Failure"],"MVP":["Minimal Viable Product"],"MandA":["Mergers and Acquisitions (MandA)"],"NDA":["Non-Disclosure Agreement (NDA)"],"NEO":["New Employee Orientation (NEO)"],"NFC":["National Fulfillment Center Partners (NFC)"],"NFR":["Not For Resale (NFR)"],"NLM":["Network License Manager (NLM)"],"NPS":["Net Promoter Score (NPS)"],"OEM":["Original Equipment Manufacturer (OEM)"],"OOO":["Out Of Office"],"ORD":["Original Requirements Document (ORD)"],"ORT":["Offering Readiness Team (ORT)"],"OSS":["Object Storage Service (OSS)"],"OTC":["One Team Conference (OTC)"],"OTE":["On-Target Earnings (OTE)"],"OVT":["One Version of the Truth"],"PAAS":["Product As A Service"],"PAC":["Production Assurance Credit"],"PC":["Partner Center (PC)"],"PCX":["Partner Customer Experience (PCX)"],"PI":["Portfolio Item (PI)"],"PIG":["Parent Industry Group (PIG)"],"PII":[""],"PIM":["Parent Industry Mix (PIM)"],"PIP":["Product Innovation Platform"],"PIS":["Parent Industry Segment (PIS)"],"PLM":["Product Lifecycle Management (PLM)"],"PM":["Project Manager"],"PO":["Purchase Order (PO)"],"POSD":["Point of Sale Data (POSD)"],"PP":[""],"PPC":["Pricing and Packaging Committee (PPC)"],"PPS":["Partner and Product Services (PPS)"],"PPV":["Purchase Price Variance (PPV)"],"PR":["Public Relations (PR)"],"PRM":["Partner Relationship Management (PRM)"],"PSEB":["Platform Solutions and Emerging Business (PSEB)"],"PSO":[""],"PSR":["Physical Shipment Request (PSR)"],"PTP":["Procure to Pay (PTP)"],"Q2C":["Quote to Collect (Q2C)"],"QA":["Quality Assurance"],"QMR":["Quarterly Marketing Release (QMR)"],"QTP":[""],"RAAS":["Rendering as a Service (RaaS)"],"RC":["Revenue Class (RC)"],"RCE":["Reputation, Consumer, and Education (RCE)"],"RFP":[""],"ROE":["Return On Equity (ROE)"],"ROI":["Return On Investment (ROI)"],"RTL":["Release to Localization"],"RTM":["Release to Manufacturing (RTM)","Resin Transfer Moulding"],"RTO":["Recovery Time Objective (RTO)"],"RTP":["Release to Print (RTP)"],"RTW":["Release to Web (RTW)"],"SA":["Sales Agent (SA)"],"SAM":["Support Account Manager"],"SC":["Software Coordinator (SC)"],"SCAR":["Supplier Corrective Action Request (SCAR)"],"SCF":["Subscription Customer Fulfillment (SCF)"],"SCL":[""],"SCO":[""],"SDF":["Sales Development Funds (SDF)"],"SEED":[""],"SFO":["San Fransico Office"],"SIC":[""],"SIM":["Simulation"],"SIP":["Solution Incentive Program (SIP)"],"SKU":["Stock-Keeping Unit (SKU)"],"SKU School":["Stock-Keeping Unit School (SKU School)"],"SLAP":["Speak Like A Person"],"SLM":["Standalone License Manager (SLM)"],"SMB":["Small & Medium Business (SMB)"],"SN":["Serial Number (SN)"],"SOx":["Sarbanes-Oxley Act (SOx)"],"SPR":["Software Provider Revenue (SPR)"],"SPS":["Software as a Service (SaaS) Platform Services"],"SQA":["Software Quality Assurance"],"SR":["Service Request (SR)"],"SRP":["Suggested Retail Price (SRP)"],"STK":["Sales Toolkit (STK)"],"SW":["Software"],"SWD":["Software Development"],"SWX":["Solid Works"],"TAD":["The Autodesk Dictionary (TAD)"],"TAM":["Total Addressed Market (TAM)"],"TAS":["Target Account Selling (TAS)"],"TBD":["To Be Determined"],"TCE":["Total Customer Experience (TCE)"],"TFS":["Team Foundation Server"],"TLA":["Three Letter Acronym"],"TLV":["TruLaser View"],"TLVS":["TruLaser View Studio"],"TN":["TruNest"],"TOL":["Transfer of License (TOL)"],"TSE":["Territory Sales Executive"],"TTC":["Total Target Compensation (TTC)"],"TTS":["Target and Territory Sheet (TTS)"],"TUX":["Total User Experience"],"Tflex":["Token Flex Offering"],"TFP":["Tailored fiber placement"],"TX":["Total User Experience"],"UAU":["Unique Active Users (UAU)"],"UI":["User Interface"],"UPI":["Unique Product Identifier"],"US":["United States"],"USA":["United States of America"],"UUID":[""],"UX":["User Experience"],"UXD":["User Experience Design (UXD)"],"VAD":["Value-Added Distributor (VAD)"],"VAR":["Value-Added Reseller (VAR)"],"VARTM":["Vacuum Assisted Resin Transfer Moulding"],"VAT":["Value-Added Tax (VAT)"],"VC":["Value Class (VC)"],"VCP":["Volume Channel Partner (VCP)"],"VCT":[""],"VIR":["Volume Incentive Rebate (VIR)"],"VRG":["Volume Rebate Group (VRG)"],"VSB":["Very Small Business (VSB)"],"VSOE":["Vendor Specific Objective Evidence (VSOE)"],"WAM":["Web Asset Manager (WAM)"],"WCFO":["Worldwide Chief Finance Organization (WCFO)"],"WWSS":["Worldwide Sales and Services (WWSS)"],"XD":["Experience Design (XD)"],"YTD":["Year-to-Date (YTD)"],"e-Flex":["Enterprise Flex Offering (e-Flex)"],"i18N":["Internationalization (i18N)"]}');